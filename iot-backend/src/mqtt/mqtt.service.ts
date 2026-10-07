import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as mqtt from 'mqtt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSensor } from '../sensors/entities/data-sensor.entity';
import { Sensor } from '../sensors/entities/sensor.entity';

export interface SensorData {
  temperature: number;
  humidity: number;
  light: number;
  receivedAt: Date;
}

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MqttService.name);
  private client: mqtt.MqttClient;

  private latestSensorData: SensorData | null = null;
  private lastSensorTime: number = 0;

  // ─── MQTT Topics ──────────────────────────────────────────────────────────
  private readonly TOPIC_SENSOR  = 'iot/sensors/data';
  private readonly TOPIC_COMMAND = 'iot/devices/command';
  private readonly TOPIC_STATUS  = 'iot/devices/status';

  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
    @InjectRepository(DataSensor)
    private dataSensorRepo: Repository<DataSensor>,
    @InjectRepository(Sensor)
    private sensorRepo: Repository<Sensor>,
  ) {}

  onModuleInit() {
    const brokerUrl =
      this.configService.get<string>('MQTT_BROKER_URL') ||
      'mqtt://10.106.158.166:1708';

    this.logger.log(`[MQTT Service] Connecting to Mosquitto Broker at ${brokerUrl}`);

    this.client = mqtt.connect(brokerUrl, {
      connectTimeout: 10000,
      reconnectPeriod: 5000,
      clientId: `iot-backend-${Date.now()}`,
    });

    this.client.on('connect', () => {
      this.logger.log('[MQTT Service] Connected to Mosquitto Broker');

      this.client.subscribe(this.TOPIC_SENSOR, (err) => {
        if (!err) this.logger.log(`[MQTT Service] Subscribed to topic: ${this.TOPIC_SENSOR}`);
        else this.logger.error(`[MQTT] Subscribe error on ${this.TOPIC_SENSOR}: ${err.message}`);
      });

      this.client.subscribe(this.TOPIC_STATUS, (err) => {
        if (!err) this.logger.log(`[MQTT Service] Subscribed to topic: ${this.TOPIC_STATUS}`);
        else this.logger.error(`[MQTT] Subscribe error on ${this.TOPIC_STATUS}: ${err.message}`);
      });
    });

    this.client.on('message', (topic, payload) => {
      const message = payload.toString().trim();
      this.handleMessage(topic, message);
    });

    this.client.on('error', (err) => {
      this.logger.error(`[MQTT Service] Connection Error: ${err.message}`);
    });

    this.client.on('offline', () => {
      this.logger.warn('[MQTT Service] Broker went offline');
    });

    this.client.on('reconnect', () => {
      this.logger.log('[MQTT Service] Reconnecting to broker...');
    });
  }

  // ─── Message Router ───────────────────────────────────────────────────────
  private async handleMessage(topic: string, message: string) {
    if (topic === this.TOPIC_SENSOR) {
      await this.handleSensorData(message);
    } else if (topic === this.TOPIC_STATUS) {
      this.handleDeviceStatus(message);
    }
  }

  // ─── Sensor Data Handler ──────────────────────────────────────────────────
  /**
   * ESP32 publishes JSON:
   *   {"temperature": 35.5, "humidity": 82.0, "light": 450}
   */
  private async handleSensorData(message: string) {
    try {
      const data = JSON.parse(message) as {
        temperature: number;
        humidity: number;
        light: number;
      };

      this.latestSensorData = {
        temperature: data.temperature,
        humidity: data.humidity,
        light: data.light,
        receivedAt: new Date(),
      };
      this.lastSensorTime = Date.now();

      this.logger.log(
        `[MQTT] Received Sensor Data: temp=${data.temperature}°C | hum=${data.humidity}% | light=${data.light}Lux → Saved to DB.`,
      );

      // Map sensor names → IDs
      const sensors = await this.sensorRepo.find();
      const sensorMap: Record<string, number> = {};
      sensors.forEach((s) => {
        const n = s.name.toLowerCase();
        if (n.includes('nhiệt') || n.includes('temp')) sensorMap['temperature'] = s.id;
        if (n.includes('ẩm')   || n.includes('hum'))  sensorMap['humidity']    = s.id;
        if (n.includes('sáng') || n.includes('light') || n.includes('lux')) sensorMap['light'] = s.id;
      });

      const entries: Partial<DataSensor>[] = [];
      if (sensorMap['temperature'] !== undefined)
        entries.push({ sensor_id: sensorMap['temperature'], value: data.temperature });
      if (sensorMap['humidity'] !== undefined)
        entries.push({ sensor_id: sensorMap['humidity'], value: data.humidity });
      if (sensorMap['light'] !== undefined)
        entries.push({ sensor_id: sensorMap['light'], value: data.light });

      if (entries.length > 0) {
        await this.dataSensorRepo.save(entries);
      }
    } catch (err) {
      this.logger.error(`[MQTT] Failed to parse sensor JSON: "${message}" → ${err.message}`);
    }
  }

  // ─── Device Status Handler ────────────────────────────────────────────────
  /**
   * ESP32 publishes PLAIN STRING (Arduino code):
   *   "LED_1 (YELLOW): ON"
   *   "LED_2 (GREEN): OFF"
   *   "LED_3 (RED): ON"
   *   "ALL_LEDS: ON"
   *
   * Strategy:
   *   1. Extract device_id from "LED_{id}" using regex
   *   2. Extract action (ON/OFF) from end of string
   *   3. Emit EventEmitter event "device.status.{id}" → resolves Promise.race in DevicesService
   */
  private handleDeviceStatus(message: string) {
    this.logger.log(`[MQTT] Received device status string: "${message}"`);

    // Handle ALL_LEDS
    if (message.includes('ALL_LEDS')) {
      const action = message.toLowerCase().includes(': on') ? 'ON' : 'OFF';
      // Emit for all possible device IDs (1, 2, 3)
      [1, 2, 3].forEach((id) => {
        const eventName = `device.status.${id}`;
        if (this.eventEmitter.listenerCount(eventName) > 0) {
          this.logger.log(`[MQTT] Emitting ALL_LEDS ${action} event → ${eventName}`);
          this.eventEmitter.emit(eventName, action);
        }
      });
      return;
    }

    // Handle individual LED: "LED_1 (YELLOW): ON" → device_id = 1
    const ledMatch = message.match(/LED_(\d+)/i);
    if (!ledMatch) {
      this.logger.warn(`[MQTT] Cannot parse device_id from status: "${message}"`);
      return;
    }

    const deviceId = parseInt(ledMatch[1], 10);
    const action = message.toLowerCase().includes(': on') ? 'ON' : 'OFF';
    const eventName = `device.status.${deviceId}`;

    this.logger.log(
      `[MQTT] Received ACK for device ${deviceId}: ${action} → Emitting event "${eventName}"`,
    );
    this.eventEmitter.emit(eventName, action);
  }

  // ─── Publish Command ──────────────────────────────────────────────────────
  /**
   * Backend → ESP32 PLAIN STRING command:
   *   "1:ON", "2:OFF", "3:ON", "ALL:ON", "ALL:OFF", "RANDOM"
   *
   * Format: "{device_id}:{action}"
   */
  publishCommand(deviceId: number, action: string): void {
    const command = `${deviceId}:${action}`;
    this.logger.log(
      `[MQTT] Publishing command "${command}" to topic "${this.TOPIC_COMMAND}" ... Waiting for ACK...`,
    );
    this.client.publish(this.TOPIC_COMMAND, command, { qos: 1 }, (err) => {
      if (err) {
        this.logger.error(`[MQTT] Publish error: ${err.message}`);
      }
    });
  }

  // ─── Public Getters ───────────────────────────────────────────────────────
  getLatestSensorData(): SensorData | null {
    return this.latestSensorData;
  }

  getLastSensorTime(): number {
    return this.lastSensorTime;
  }

  isSensorConnected(): boolean {
    if (!this.latestSensorData || this.lastSensorTime === 0) return false;
    return Date.now() - this.lastSensorTime <= 10000; // 10s threshold
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
      this.logger.log('[MQTT Service] Disconnected from broker');
    }
  }
}

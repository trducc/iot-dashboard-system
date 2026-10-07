import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSensor } from './entities/data-sensor.entity';
import { Sensor } from './entities/sensor.entity';
import { MqttService } from '../mqtt/mqtt.service';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(DataSensor)
    private dataSensorRepo: Repository<DataSensor>,
    @InjectRepository(Sensor)
    private sensorRepo: Repository<Sensor>,
    private mqttService: MqttService,
  ) {}

  /**
   * UC2: Latest realtime data from MQTT cache + disconnect detection
   */
  async getLatest() {
    const latestData = this.mqttService.getLatestSensorData();
    const connected = this.mqttService.isSensorConnected();

    if (!latestData || !connected) {
      // Fallback: get latest from DB
      const sensors = await this.sensorRepo.find();
      const dbData: Record<string, any> = {};

      for (const sensor of sensors) {
        const latest = await this.dataSensorRepo.findOne({
          where: { sensor_id: sensor.id },
          order: { created_at: 'DESC' },
        });
        if (latest) {
          dbData[sensor.name] = { value: latest.value, at: latest.created_at };
        }
      }

      return {
        connected: false,
        warning: 'Cảm biến mất tín hiệu / Disconnected',
        data: dbData,
        timestamp: latestData?.receivedAt || null,
      };
    }

    return {
      connected: true,
      data: {
        temperature: latestData.temperature,
        humidity: latestData.humidity,
        light: latestData.light,
      },
      timestamp: latestData.receivedAt,
    };
  }

  /**
   * UC3: Chart data - 50 latest readings per sensor
   */
  async getChartData() {
    const sensors = await this.sensorRepo.find();
    const result: Record<string, any[]> = {};

    for (const sensor of sensors) {
      const readings = await this.dataSensorRepo
        .createQueryBuilder('ds')
        .where('ds.sensor_id = :sid', { sid: sensor.id })
        .orderBy('ds.created_at', 'DESC')
        .take(50)
        .getMany();

      const sensorKey = this.getSensorKey(sensor.name);
      result[sensorKey] = readings.reverse().map((r) => ({
        id: r.id,
        value: r.value,
        created_at: r.created_at,
      }));
    }

    return result;
  }

  /**
   * UC5: History with pagination, sort, filter
   */
  async getHistory(query: {
    page?: number;
    limit?: number;
    sort?: 'ASC' | 'DESC';
    sortBy?: 'created_at' | 'value';
    sensor_id?: number;
    sensor_name?: string;
    time?: string;
    warning_type?: string;
    search?: string;
  }) {
    const page = Math.max(query.page || 1, 1);
    const limit = Math.min(Math.max(query.limit || 20, 1), 100);
    const sort = (query.sort || 'DESC') as 'ASC' | 'DESC';
    const sortBy = query.sortBy === 'value' ? 'ds.value' : 'ds.created_at';
    const offset = (page - 1) * limit;

    const qb = this.dataSensorRepo
      .createQueryBuilder('ds')
      .leftJoinAndSelect('ds.sensor', 'sensor');

    if (query.sensor_id) {
      qb.andWhere('ds.sensor_id = :sid', { sid: query.sensor_id });
    }

    if (query.sensor_name) {
      qb.andWhere('sensor.name LIKE :sname', {
        sname: `%${query.sensor_name}%`,
      });
    }

    if (query.time) {
      qb.andWhere('CAST(ds.created_at AS CHAR) LIKE :time', { time: `%${query.time}%` });
    }

    if (query.warning_type) {
      if (query.warning_type === 'HIGH_TEMP') {
        qb.andWhere('ds.value > 40');
      }
    }

    if (query.search) {
      if (query.sensor_id) {
        qb.andWhere('CAST(ds.value AS CHAR) LIKE :s', { s: `%${query.search}%` });
      } else {
        qb.andWhere('(sensor.name LIKE :s OR CAST(ds.value AS CHAR) LIKE :s OR CAST(ds.created_at AS CHAR) LIKE :s)', {
          s: `%${query.search}%`,
        });
      }
    }

    qb.orderBy(sortBy, sort);

    const [data, total] = await qb.skip(offset).take(limit).getManyAndCount();

    return {
      data: data.map((d) => ({
        id: d.id,
        sensor_id: d.sensor_id,
        sensor_name: d.sensor?.name || '',
        value: d.value,
        created_at: d.created_at,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAllSensors() {
    return this.sensorRepo.find();
  }

  private getSensorKey(name: string): string {
    const lower = name.toLowerCase();
    if (lower.includes('nhiệt') || lower.includes('temp')) return 'temperature';
    if (lower.includes('ẩm') || lower.includes('hum')) return 'humidity';
    if (lower.includes('sáng') || lower.includes('light') || lower.includes('lux')) return 'light';
    return name;
  }

  // padDateTime removed since we use LIKE for time
}

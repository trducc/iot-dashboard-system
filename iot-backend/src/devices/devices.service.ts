import {
  Injectable,
  NotFoundException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Device } from './entities/device.entity';
import { Action } from './entities/action.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { ActionDto } from './dto/action.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
    @InjectRepository(Action)
    private actionRepo: Repository<Action>,
    private mqttService: MqttService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getAllDevices() {
    return this.deviceRepo.find();
  }

  /**
   * UC4: Device control với Promise.race() - 5s timeout
   *
   * Flow:
   * 1. INSERT action row với status = PENDING
   * 2. Publish JSON {"device_id": X, "action": "ON"} lên MQTT
   * 3. Promise.race giữa:
   *    - Luồng A: Lắng nghe event 'device.status.{id}' từ MQTT service (ESP32 trả về)
   *    - Luồng B: setTimeout 5000ms → reject timeout
   * 4. Nếu A thắng → UPDATE PENDING → SUCCESS → 200 OK
   *    Nếu B thắng → UPDATE PENDING → FAILED → throw 504
   */
  async sendAction(userId: number, dto: ActionDto) {
    const device = await this.deviceRepo.findOne({
      where: { id: dto.device_id },
    });
    if (!device) throw new NotFoundException('Không tìm thấy thiết bị');

    // B1: INSERT với status PENDING
    const actionRecord = this.actionRepo.create({
      user_id: userId,
      device_id: dto.device_id,
      action: dto.action,
      status: 'PENDING',
    });
    const saved = await this.actionRepo.save(actionRecord);

    // B2: Publish lệnh JSON lên MQTT
    this.mqttService.publishCommand(dto.device_id, dto.action);

    try {
      // B3: Promise.race - lắng nghe EventEmitter vs setTimeout 5s
      const deviceStatus = await this.waitForDeviceAck(dto.device_id, 5000);

      // B4a: Mạch phản hồi trước 5s → SUCCESS
      await this.actionRepo.update(saved.id, { status: 'SUCCESS' });

      return {
        id: saved.id,
        device_id: dto.device_id,
        device_name: device.name,
        action: dto.action,
        status: 'SUCCESS',
        device_status: deviceStatus,
        message: `Thiết bị ${device.name} đã ${dto.action === 'ON' ? 'bật' : 'tắt'} thành công`,
      };
    } catch (err) {
      // B4b: Timeout hoặc lỗi → FAILED
      await this.actionRepo.update(saved.id, { status: 'FAILED' });

      if (err.message === 'MQTT_TIMEOUT') {
        throw new GatewayTimeoutException(
          'Thiết bị không phản hồi trong 5 giây. Kiểm tra kết nối phần cứng.',
        );
      }
      throw err;
    }
  }

  /**
   * Lắng nghe EventEmitter event 'device.status.{deviceId}'
   * Race với setTimeout 5000ms
   */
  private waitForDeviceAck(deviceId: number, timeoutMs: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const eventName = `device.status.${deviceId}`;

      // Luồng B: timeout 5s
      const timer = setTimeout(() => {
        this.eventEmitter.removeAllListeners(eventName);
        reject(new Error('MQTT_TIMEOUT'));
      }, timeoutMs);

      // Luồng A: lắng nghe event từ MQTT service
      this.eventEmitter.once(eventName, (status: string) => {
        clearTimeout(timer);
        resolve(status);
      });
    });
  }

  /**
   * UC6: Action history - phân trang, filter, sort
   */
  async getHistory(query: {
    page?: number;
    limit?: number;
    sort?: 'ASC' | 'DESC';
    device_id?: number;
    device_name?: string;
    action?: string;
    status?: string;
    time?: string;
    search?: string;
  }) {
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const sort = (query.sort || 'DESC') as 'ASC' | 'DESC';
    const offset = (page - 1) * limit;

    const qb = this.actionRepo
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.device', 'device')
      .leftJoinAndSelect('a.user', 'user');

    if (query.device_id) qb.andWhere('a.device_id = :did', { did: query.device_id });
    if (query.device_name) qb.andWhere('device.name LIKE :dname', { dname: `%${query.device_name}%` });
    if (query.action) qb.andWhere('a.action = :action', { action: query.action.toUpperCase() });
    if (query.status) qb.andWhere('a.status = :status', { status: query.status.toUpperCase() });
    if (query.time) qb.andWhere('CAST(a.created_at AS CHAR) LIKE :time', { time: `%${query.time}%` });
    if (query.search) {
      qb.andWhere('(device.name LIKE :s OR a.action LIKE :s OR a.status LIKE :s OR user.username LIKE :s OR user.full_name LIKE :s OR CAST(a.created_at AS CHAR) LIKE :s)', {
        s: `%${query.search}%`,
      });
    }

    qb.orderBy('a.id', sort);

    const [data, total] = await qb.skip(offset).take(limit).getManyAndCount();

    return {
      data: data.map((a) => ({
        id: a.id,
        device_id: a.device_id,
        device_name: a.device?.name || '',
        user_id: a.user_id,
        username: a.user?.full_name || a.user?.username || 'admin',
        action: a.action,
        status: a.status,
        created_at: a.created_at,
      })),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  // padDateTime removed since we use LIKE for time
}

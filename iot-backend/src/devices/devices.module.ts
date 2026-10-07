import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';
import { Action } from './entities/action.entity';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Action]), MqttModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}

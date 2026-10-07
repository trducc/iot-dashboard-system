import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttService } from './mqtt.service';
import { DataSensor } from '../sensors/entities/data-sensor.entity';
import { Sensor } from '../sensors/entities/sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataSensor, Sensor])],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}

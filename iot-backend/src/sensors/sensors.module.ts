import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { DataSensor } from './entities/data-sensor.entity';
import { Sensor } from './entities/sensor.entity';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [TypeOrmModule.forFeature([DataSensor, Sensor]), MqttModule],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SensorsModule } from './sensors/sensors.module';
import { DevicesModule } from './devices/devices.module';
import { MqttModule } from './mqtt/mqtt.module';
import { User } from './users/entities/user.entity';
import { Sensor } from './sensors/entities/sensor.entity';
import { DataSensor } from './sensors/entities/data-sensor.entity';
import { Device } from './devices/entities/device.entity';
import { Action } from './devices/entities/action.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: parseInt(config.get<string>('DB_PORT') || '3306'),
        username: config.get<string>('DB_USERNAME') || 'root',
        password: config.get<string>('DB_PASSWORD') || '',
        database: config.get<string>('DB_NAME') || 'iot',
        entities: [User, Sensor, DataSensor, Device, Action],
        synchronize: false,
        logging: false,
        timezone: '+07:00',
      }),
    }),
    MqttModule,
    AuthModule,
    UsersModule,
    SensorsModule,
    DevicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

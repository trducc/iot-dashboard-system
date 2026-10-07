import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sensor } from './sensor.entity';

@Entity('data_sensors')
export class DataSensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensor_id: number;

  @Column({ type: 'float' })
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Sensor, (sensor) => sensor.data_sensors)
  @JoinColumn({ name: 'sensor_id' })
  sensor: Sensor;
}

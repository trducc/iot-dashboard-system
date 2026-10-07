import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { DataSensor } from './data-sensor.entity';

@Entity('sensors')
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => DataSensor, (ds) => ds.sensor)
  data_sensors: DataSensor[];
}

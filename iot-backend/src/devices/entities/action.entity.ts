import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Device } from './device.entity';

@Entity('action')
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  device_id: number;

  @Column({ length: 20 })
  action: string;

  @Column({ length: 20 })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Device, (d) => d.actions)
  @JoinColumn({ name: 'device_id' })
  device: Device;
}

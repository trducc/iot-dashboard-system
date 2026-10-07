import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100 })
  full_name: string;

  @Column({ length: 20 })
  student_id: string;

  @Column({ length: 50 })
  class_name: string;

  @Column({ length: 255, nullable: true })
  github_link: string;

  @Column({ length: 255, nullable: true })
  figma_link: string;

  @Column({ length: 255, nullable: true })
  postman_link: string;

  @Column({ length: 255, nullable: true })
  pdf_link: string;

  @CreateDateColumn()
  created_at: Date;
}

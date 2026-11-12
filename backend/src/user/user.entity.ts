import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IUser } from './user.interface.js';

export type Role = 'customer' | 'staff' | 'admin';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'bool', default: false })
  emailVerified!: boolean;

  @Column({ type: 'text', select: false })
  passwordHash!: string;

  @Column({})
  roles: Role[];

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updtedAt: String;
}

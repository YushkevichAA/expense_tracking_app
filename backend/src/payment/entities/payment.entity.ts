import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/user.entity.js';

export type TStatusPayment = 'planned' | 'paid' | 'overdue';
export interface IPayment {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: TStatusPayment;
}

@Entity()
export class Payment implements IPayment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id' })
  user_id: string;

  // Отношение — для удобной работы в коде
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  dueDate!: string;

  @Column()
  status!: TStatusPayment;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  title: string;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updtedAt: String;
}

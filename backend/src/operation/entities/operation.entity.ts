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

export type TOperation = 'expenses' | 'income' | 'start_value';
export interface IOperation {
  id: string;
  user_id: string;
  type: TOperation;
  amount: number;
  comment: string;
}

@Entity()
export class Operation implements IOperation {
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

  @Column({ type: 'text', unique: true })
  type!: TOperation;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updtedAt: String;
}

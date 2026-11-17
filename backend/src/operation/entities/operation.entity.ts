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

export type TOperation = 'expenses' | 'income';
export type TCategory = 'Питание' | 'Транспорт' | 'Учёба' | 'Жильё' | 'Другое';
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

  @Column()
  date!: string;

  @Column()
  type!: TOperation;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  category: TCategory;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updtedAt: String;
}

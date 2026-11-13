import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'uuid' })
  user_id!: string;

  @Column({ type: 'text', unique: true })
  type!: TOperation;

  @Column()
  amount!: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updtedAt: String;
}

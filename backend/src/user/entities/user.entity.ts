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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({})
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updtedAt: String;
}

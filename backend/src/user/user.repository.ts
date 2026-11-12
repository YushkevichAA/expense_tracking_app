import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export type PublicUser = Pick<User, 'id' | 'email'>;

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async create(
    email: string,
    {
      passwordHash,
      emailVerified = false,
    }: { passwordHash?: string; emailVerified?: boolean } = {},
  ): Promise<PublicUser> {
    const user = await this.repository.save(
      this.repository.create({
        id: randomUUID(),
        email: normalize(email),
        emailVerified,
        role: 'customer',
        passwordHash,
      }),
    );

    return { id: user.id, email: user.email };
  }

  async findById(id: string): Promise<PublicUser | null> {
    return this.repository.findOne({
      where: { id },
      select: { id: true, email: true },
    });
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    return this.repository.findOne({
      where: { email },
      select: { id: true, email: true },
    });
  }

  /** For password sign-in only. */
  async findCredentials(email: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne();
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

const normalize = (email: string) =>
  email.trim().normalize('NFC').toLowerCase();

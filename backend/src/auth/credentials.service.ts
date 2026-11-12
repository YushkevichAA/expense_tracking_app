import { ConflictException, Injectable } from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import { QueryFailedError } from 'typeorm';
import { UsersRepository } from '../user/user.repository.js';
import { User } from '../user/user.entity.js';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async register(email: string, password: string) {
    const passwordHash = await this.passwordHasher.hash(password);

    try {
      return await this.usersRepository.create(email.toLowerCase(), {
        passwordHash,
      });
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('UNIQUE constraint failed: users.email')
      ) {
        throw new ConflictException('Email уже зарегистрирован');
      }
      throw error;
    }
  }

  async verify(email: string, password: string) {
    const user = await this.usersRepository.findCredentials(
      email.toLowerCase(),
    );
    const valid = await this.passwordHasher.verify(
      password,
      user?.passwordHash,
    );

    if (!user || !valid) {
      return null;
    }

    return { id: user.id, email: user.email };
  }
}

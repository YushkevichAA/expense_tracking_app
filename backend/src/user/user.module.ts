import { Module } from '@nestjs/common';
import { User } from './user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UserModule {}

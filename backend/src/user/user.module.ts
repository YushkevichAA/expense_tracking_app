import { Module } from '@nestjs/common';
import { User } from './user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository.js';
import { UserSubscriber } from './user_subscriber.provider.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UserSubscriber],
  exports: [UsersRepository],
})
export class UserModule {}

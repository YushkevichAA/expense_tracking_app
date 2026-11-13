import { Module } from '@nestjs/common';
import { User } from './user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository.js';
import { MeController } from './me.controler.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [MeController],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UserModule {}

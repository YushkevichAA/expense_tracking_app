import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { SessionAuth } from './session-auth.provider.js';
import { UsersRepository } from '../user/user.repository.js';
import { CredentialsService } from './credentials.service.js';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [SessionAuth, CredentialsService],
})
export class AuthModule {}

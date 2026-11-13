import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticationGuard, CurrentUser } from '@nestjs/authentication';
import { User } from './user.entity.js';

@Controller('me')
@UseGuards(AuthenticationGuard)
export class MeController {
  @Get()
  me(@CurrentUser() user: User) {
    return user;
  }
}

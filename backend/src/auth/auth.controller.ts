import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  AuthenticationGuard,
  CurrentUser,
  Public,
  SignInService,
} from '@nestjs/authentication';
import { CredentialsService } from './credentials.service.js';
import { SignInDto, SignUpDto } from './dto/auth.dto.js';
import { type PublicUser } from '../user/user.repository.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly signInService: SignInService,
  ) {}

  @Get('check')
  @UseGuards(AuthenticationGuard)
  async checkAuth(@CurrentUser() user: PublicUser) {
    return user;
  }

  @Post('sign-up')
  @Public()
  async signUp(@Body() body: SignUpDto) {
    const user = await this.credentialsService.register(
      body.email,
      body.username,
      body.password,
    );
    await this.signInService.signIn(user.id, {
      method: 'password',
    });
    return user;
  }

  @Post('sign-in')
  @Public()
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {
    const user = await this.credentialsService.verify(
      body.email,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { session } = await this.signInService.signIn(user.id, {
      method: 'password',
    });
    return { mfaRequired: session.mfa === 'pending' };
  }

  @Post('sign-out')
  @Public()
  @HttpCode(200)
  async signOut(@Body() body: SignInDto) {
    const signedOut = await this.signInService.signOut();

    if (!signedOut) {
      throw new UnauthorizedException('Сессия не найдена');
    }
  }

  @Delete('delete')
  @UseGuards(AuthenticationGuard)
  @HttpCode(204)
  async delete(@CurrentUser('id') user_id: string) {
    await this.signInService.signOut();
    return await this.credentialsService.delete(user_id);
  }
}

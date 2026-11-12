import { Injectable } from '@nestjs/common';
import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from '@nestjs/authentication';
import { type PublicUser, UsersRepository } from '../user/user.repository.js';

@Injectable()
export class SessionAuth extends SessionCookieProvider<PublicUser> {
  constructor(
    private readonly users: UsersRepository,
    registry: AuthenticationRegistry,
  ) {
    super();
    registry.registerProvider(this);
  }

  validate(session: SessionRecord) {
    return this.users.findById(session.userId);
  }
}

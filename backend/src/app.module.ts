import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'node:path';
import { AuthenticationModule } from '@nestjs/authentication';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_PATH
        ? resolve(process.env.DB_PATH)
        : resolve(process.cwd(), 'database.sqlite'),
      entities: [],
      autoLoadEntities: true,
      synchronize: process.env.MODE === 'development' ? true : false,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

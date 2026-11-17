import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'node:path';
import { AuthenticationModule } from '@nestjs/authentication';
import { AuthModule } from './auth/auth.module.js';
import { OperationModule } from './operation/operation.module.js';
import { CategoryModule } from './category/category.module.js';
import { PaymentModule } from './payment/payment.module.js';

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
    AuthenticationModule.forRoot({
      globalGuard: false,
      session: {
        absoluteTtl: '14d',
        idleTtl: '3d',
      },
    }),
    AuthModule,
    UserModule,
    OperationModule,
    CategoryModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

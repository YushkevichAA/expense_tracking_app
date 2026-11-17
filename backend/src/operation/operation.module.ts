import { Module } from '@nestjs/common';
import { OperationService } from './operation.service.js';
import { OperationController } from './operation.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService],
})
export class OperationModule {}

import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto.js';
import { UpdateOperationDto } from './dto/update-operation.dto.js';
import { StartOperationDto } from './dto/start-operation.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity.js';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly repository: Repository<Operation>,
  ) {}

  async start(
    userId: string,
    { amount }: StartOperationDto,
  ): Promise<Operation> {
    const operation = await this.repository.save(
      this.repository.create({
        id: randomUUID(),
        user_id: userId,
        type: 'start_value',
        amount: amount,
        comment: 'Начальная сумма',
      }),
    );

    return operation;
  }
  async create(userId: string, { type, amount, comment }: CreateOperationDto) {
    return 'This action adds a new operation';
  }

  findAll(userId: string) {
    return `This action returns all operation`;
  }

  findOne(userId: string, id: string) {
    return `This action returns a #${id} operation`;
  }

  update(userId: string, id: string, updateOperationDto: UpdateOperationDto) {
    //   const result = await this.operationsRepository
    // .createQueryBuilder()
    // .update(Operation)
    // .set(dto)
    // .where('id = :operationId AND user_id = :userId', {
    //   operationId,
    //   userId,
    // })
    // .execute();
    return `This action updates a #${id} operation`;
  }

  remove(userId: string, id: string) {
    return `This action removes a #${id} operation`;
  }
}

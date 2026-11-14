import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto.js';
import { UpdateOperationDto } from './dto/update-operation.dto.js';
import { StartOperationDto } from './dto/start-operation.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity.js';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { plainToClass } from 'class-transformer';
import { NotFoundError } from 'rxjs';

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

  async create(
    user_id: string,
    { type, amount, comment }: CreateOperationDto,
  ): Promise<Operation> {
    const operation = await this.repository.save(
      this.repository.create({
        id: randomUUID(),
        user_id,
        type: 'start_value',
        amount: amount,
        comment: 'Начальная сумма',
      }),
    );
    return operation;
  }

  async findAll(user_id: string): Promise<Operation[]> {
    const operators = await this.repository.find({
      where: { user_id },
      select: {
        id: true,
        type: true,
        amount: true,
        comment: true,
        createdAt: true,
        updtedAt: true,
      },
    });
    return operators;
  }

  async findOne(user_id: string, id: string): Promise<Operation> {
    const operator = await this.repository.findOneOrFail({
      where: { user_id, id },
      select: {
        type: true,
        amount: true,
        comment: true,
        createdAt: true,
        updtedAt: true,
      },
    });
    return operator;
  }

  async update(
    user_id: string,
    id: string,
    updateOperationDto: UpdateOperationDto,
  ) {
    const operation = await this.repository.findOneOrFail({
      where: { user_id, id },
    });

    return await this.repository.save(
      Object.assign({ ...operation, updateOperationDto }),
    );
  }

  async remove(user_id: string, id: string) {
    return await this.repository.delete({ user_id, id });
  }
}

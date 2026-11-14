import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    user_id: string,
    { amount }: StartOperationDto,
  ): Promise<Operation> {
    const existOperation = await this.repository.findOne({
      where: { user_id, type: 'start_value' },
    });
    if (existOperation) {
      throw new ConflictException('start value already exist');
    }

    const operation = await this.repository.save(
      this.repository.create({
        id: randomUUID(),
        user_id: user_id,
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
    const existOperation = await this.repository.findOne({
      where: { user_id, type: 'start_value' },
    });
    if (!existOperation) {
      throw new NotFoundException('start value not exist');
    }
    const operation = await this.repository.save(
      this.repository.create({
        id: randomUUID(),
        user_id,
        type: type,
        amount: amount,
        comment: comment ?? null,
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
    const result = await this.repository.update(
      { user_id, id },
      updateOperationDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException('Post not found');
    }

    return await this.repository.findOneOrFail({
      where: { user_id, id },
    });
  }

  async remove(user_id: string, id: string) {
    return await this.repository.delete({ user_id, id });
  }

  async reset_all(user_id: string) {
    return await this.repository.delete({ user_id });
  }
}

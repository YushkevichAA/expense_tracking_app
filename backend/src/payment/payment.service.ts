import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity.js';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async create(
    user_id: string,
    { title, amount, dueDate, status }: CreatePaymentDto,
  ) {
    const payment = await this.repository.save(
      this.repository.create({
        id: randomUUID(),
        user_id,
        title,
        amount,
        dueDate,
        status,
      }),
    );
    return payment;
  }

  async findAll(user_id: string) {
    const payments = await this.repository.find({
      where: { user_id },
      select: {
        id: true,
        title: true,
        amount: true,
        dueDate: true,
        status: true,
      },
    });
    return payments;
  }

  async findOne(user_id: string, id: string) {
    const payment = await this.repository.findOneOrFail({
      where: { user_id, id },
      select: {
        id: true,
        title: true,
        amount: true,
        dueDate: true,
        status: true,
      },
    });
    return payment;
  }

  async update(
    user_id: string,
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ) {
    const result = await this.repository.update(
      { user_id, id },
      updatePaymentDto,
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

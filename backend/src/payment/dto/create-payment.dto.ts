import { TStatusPayment } from '../entities/payment.entity.js';

export class CreatePaymentDto {
  title: string;
  amount: number;
  dueDate: string;
  status: TStatusPayment;
}

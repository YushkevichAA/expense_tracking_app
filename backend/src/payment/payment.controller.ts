import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { AuthenticationGuard, CurrentUser } from '@nestjs/authentication';

@Controller('payment')
@UseGuards(AuthenticationGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(
    @CurrentUser('id') user_id: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.create(user_id, createPaymentDto);
  }

  @Get()
  findAll(@CurrentUser('id') user_id: string) {
    return this.paymentService.findAll(user_id);
  }

  @Get(':id')
  findOne(@CurrentUser('id') user_id: string, @Param('id') id: string) {
    return this.paymentService.findOne(user_id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser('id') user_id: string,
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(user_id, id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@CurrentUser('id') user_id: string, @Param('id') id: string) {
    return this.paymentService.remove(user_id, id);
  }

  @Delete()
  reset_all(@CurrentUser('id') user_id: string) {
    return this.paymentService.reset_all(user_id);
  }
}

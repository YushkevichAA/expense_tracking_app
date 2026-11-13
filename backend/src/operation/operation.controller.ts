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
import { OperationService } from './operation.service.js';
import { CreateOperationDto } from './dto/create-operation.dto.js';
import { UpdateOperationDto } from './dto/update-operation.dto.js';
import { StartOperationDto } from './dto/start-operation.dto.js';
import { AuthenticationGuard, CurrentUser } from '@nestjs/authentication';

@Controller('operation')
@UseGuards(AuthenticationGuard)
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post('start_balance')
  create_start_balance(
    @CurrentUser('id') userId: string,
    @Body() startOperationDto: StartOperationDto,
  ) {
    return this.operationService.start(userId, startOperationDto);
  }

  @Post()
  create(
    @CurrentUser('id') userId: string,
    @Body() createOperationDto: CreateOperationDto,
  ) {
    return this.operationService.create(userId, createOperationDto);
  }

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.operationService.findAll(userId);
  }

  @Get(':id')
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.operationService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.update(userId, id, updateOperationDto);
  }

  @Delete(':id')
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.operationService.remove(userId, id);
  }
}

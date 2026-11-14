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
    @CurrentUser('id') user_id: string,
    @Body() startOperationDto: StartOperationDto,
  ) {
    return this.operationService.start(user_id, startOperationDto);
  }

  @Post()
  create(
    @CurrentUser('id') user_id: string,
    @Body() createOperationDto: CreateOperationDto,
  ) {
    return this.operationService.create(user_id, createOperationDto);
  }

  @Get()
  findAll(@CurrentUser('id') user_id: string) {
    return this.operationService.findAll(user_id);
  }

  @Get(':id')
  findOne(@CurrentUser('id') user_id: string, @Param('id') id: string) {
    return this.operationService.findOne(user_id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser('id') user_id: string,
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    console.log(updateOperationDto);
    return this.operationService.update(user_id, id, updateOperationDto);
  }

  @Delete(':id')
  remove(@CurrentUser('id') user_id: string, @Param('id') id: string) {
    return this.operationService.remove(user_id, id);
  }

  @Delete()
  reset_all(@CurrentUser('id') user_id: string) {
    return this.operationService.reset_all(user_id);
  }
}

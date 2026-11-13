import { PartialType } from '@nestjs/mapped-types';
import { CreateOperationDto } from './create-operation.dto.js';

export class UpdateOperationDto extends PartialType(CreateOperationDto) {}

import { TOperation } from '../entities/operation.entity.js';

export class CreateOperationDto {
  type!: TOperation;
  amount!: number;
  comment: string;
}

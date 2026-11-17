import { TCategory, TOperation } from '../entities/operation.entity.js';

export class CreateOperationDto {
  date: string;
  category: TCategory;
  type!: TOperation;
  amount!: number;
  comment: string;
}

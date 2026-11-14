export class CreateOperationDto {
  type!: 'expenses' | 'income' | 'start_balance';
  amount!: number;
  comment: string | null;
}

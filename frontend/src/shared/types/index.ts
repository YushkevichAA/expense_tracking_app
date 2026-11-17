export type TOperation = "expense" | "income";

export interface IOperation {
  id: string;
  date: string;
  type: TOperation;
  category: string;
  comment: string;
  amount: number;
}

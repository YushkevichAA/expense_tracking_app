export type TOperation = "expense" | "income";

export interface IOperation {
  id: string;
  date: string;
  type: TOperation;
  category: string;
  comment: string;
  amount: number;
}

export type TStatusPayment = "planned" | "paid" | "overdue";

export interface IPayment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: TStatusPayment;
}

export interface IOperation {
  id: string;
  date: string;
  type: "expense" | "income";
  category: string;
  comment: string;
  amount: number;
}

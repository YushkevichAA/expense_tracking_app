import { create } from "zustand";
import type { IPayment } from "../shared/types";

interface IStoreState {
  payments: IPayment[];
}

interface IStoreActions {
  actions: {
    setPayments: (payload: IPayment[]) => void;
    addPayment: (payload: IPayment) => void;
    updatePayment: (payload: IPayment) => void;
    deletePayment: (id: string) => void;
    deleteAllPayment: () => void;
  };
}

export const useRootStore = create<IStoreState & IStoreActions>()((set) => ({
  // State
  payments: [],

  // Actions
  actions: {
    setPayments: (payload: IPayment[]) =>
      set(() => ({
        payments: [...payload],
      })),
    addPayment: (payload: IPayment) =>
      set((state) => ({
        payments: [...state.payments, payload],
      })),
    updatePayment: (payload: IPayment) =>
      set((state) => ({
        payments: state.payments.map((payment) => {
          if (payload.id === payment.id) {
            return payload;
          }
          return payment;
        }),
      })),
    deletePayment: (id: string) =>
      set((state) => ({
        payments: state.payments.filter((payment) => payment.id !== id),
      })),
    deleteAllPayment: () =>
      set(() => ({
        payments: [],
      })),
  },
}));

export const usePayments = (): IPayment[] =>
  useRootStore((state) => state.payments);

export const usePaymentsActions = (): IStoreActions["actions"] =>
  useRootStore((state) => state.actions);

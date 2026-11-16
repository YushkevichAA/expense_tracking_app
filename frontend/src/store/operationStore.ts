import { create } from "zustand";
import type { IOperation } from "../shared/types";

export type TThemeName = "gpnDefault" | "gpnDark";

interface IStoreState {
  operations: IOperation[];
}

interface IStoreActions {
  actions: {
    setOperations: (payload: IOperation[]) => void;
    addOperation: (payload: IOperation) => void;
    updateOperation: (payload: IOperation) => void;
    deleteOperation: (id: string) => void;
    deleteAllOperation: () => void;
  };
}

export const useRootStore = create<IStoreState & IStoreActions>()((set) => ({
  // State
  operations: [],

  // Actions
  actions: {
    setOperations: (payload: IOperation[]) =>
      set(() => ({
        operations: [...payload],
      })),
    addOperation: (payload: IOperation) =>
      set((state) => ({
        operations: [...state.operations, payload],
      })),
    updateOperation: (payload: IOperation) =>
      set((state) => ({
        operations: state.operations.map((operation) => {
          if (payload.id === operation.id) {
            return payload;
          }
          return operation;
        }),
      })),
    deleteOperation: (id: string) =>
      set((state) => ({
        operations: state.operations.filter((operation) => operation.id !== id),
      })),
    deleteAllOperation: () =>
      set(() => ({
        operations: [],
      })),
  },
}));

export const useOperations = (): IOperation[] =>
  useRootStore((state) => state.operations);

export const useOperationsActions = (): IStoreActions["actions"] =>
  useRootStore((state) => state.actions);

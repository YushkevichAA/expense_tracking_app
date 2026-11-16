import { create } from "zustand";

export type TThemeName = "gpnDefault" | "gpnDark";

export type TUser = {
  id: string;
  username: string;
  email: string;
};

interface IStoreState {
  user: TUser | null;
}

interface IStoreActions {
  actions: {
    setUser: (value: TUser) => void;
  };
}

const useRootStore = create<IStoreState & IStoreActions>()((set) => ({
  // State
  user: null,

  // Actions
  actions: {
    setUser: (payload: TUser | null) =>
      set(() => ({
        user: payload,
      })),
  },
}));

export const useUser = (): TUser | null => useRootStore((state) => state.user);

export const useUserActions = (): IStoreActions["actions"] =>
  useRootStore((state) => state.actions);

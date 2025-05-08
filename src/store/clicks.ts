import { create } from 'zustand';

type Store = {
  count: number;
  setCount: (n: number) => void;
};

export const useClickStore = create<Store>((set) => ({
  count: 0,
  setCount: (n) => set({ count: n }),
}));

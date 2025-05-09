import { create } from 'zustand';

type Store = {
  count: number;
  setCount: (n: number) => void;
  load: () => Promise<void>;
  inc: () => Promise<void>;
};

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL; // relative

export const useClickStore = create<Store>((set, get) => ({
  count: 0,
  setCount: (n) => set({ count: n }),

  load: async () => {
    try {
      const res = await fetch(`${API_BASE}/api/clicks`);
      const data = await res.json() as { count: number };
      set({ count: data.count });
    } catch (err) {
      console.error('Failed to load count', err);
    }
  },

  inc: async () => {
    const next = get().count + 1;
    set({ count: next });
    try {
      await fetch(`${API_BASE}/api/clicks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: next }),
      });
    } catch (err) {
      console.error('Failed to save count', err);
    }
  },
}));

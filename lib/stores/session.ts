import { create } from "zustand";

interface SessionStore {
  started: boolean;
  step: number;
  elapsedSec: number;
  logro: string;
  shake: boolean;
  start: () => void;
  tick: () => void;
  next: () => void;
  setLogro: (line: string) => void;
  setShake: (shake: boolean) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  started: false,
  step: 0,
  elapsedSec: 0,
  logro: "",
  shake: false,
  start: () => set({ started: true, step: 0, elapsedSec: 0 }),
  tick: () => set((state) => ({ elapsedSec: state.elapsedSec + 1 })),
  next: () => set((state) => ({ step: state.step + 1, shake: false })),
  setLogro: (line) => set({ logro: line }),
  setShake: (shake) => set({ shake }),
}));

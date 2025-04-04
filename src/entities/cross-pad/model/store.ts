import { create } from "zustand";
import { Direction, CrossPadState } from "./types";

interface CrossPadStore extends CrossPadState {
  setDirection: (direction: Direction | null) => void;
  setPressed: (isPressed: boolean) => void;
  reset: () => void;
}

const initialState: CrossPadState = {
  currentDirection: null,
  isPressed: false,
  count: 0,
};

export const useCrossPadStore = create<CrossPadStore>((set, get) => ({
  ...initialState,
  setDirection: (direction) => set({ currentDirection: direction }),
  setPressed: (isPressed) => set({ isPressed, count: get().count + 1 }),
  reset: () => set(initialState),
})); 
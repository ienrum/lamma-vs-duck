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
};

export const useCrossPadStore = create<CrossPadStore>((set) => ({
  ...initialState,
  setDirection: (direction) => set({ currentDirection: direction }),
  setPressed: (isPressed) => set({ isPressed }),
  reset: () => set(initialState),
})); 
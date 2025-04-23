import { create } from 'zustand';

let id = 0;

interface BackButtonStore {
  backwardClickedId: number;
  backwardGame: () => void;
}

const initialState = {
  backwardClickedId: 0,
};

export const useBackButtonStore = create<BackButtonStore>((set, get) => ({
  ...initialState,
  backwardGame: () => {
    set({ backwardClickedId: id++ });
  },
}));

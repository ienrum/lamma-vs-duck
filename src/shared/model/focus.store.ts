import { create } from "zustand";

interface FocusEvent {
  id: string;
  message: string;
}

interface FocusStore {
  focusEvent: FocusEvent | null;
  focus: (id: string, message: string, timeout?: number) => void;
  isFocused: (id: string) => boolean;
}

const initialState: FocusStore = {
  focusEvent: null,
  focus: () => { },
  isFocused: () => false,
};

export const useFocusStore = create<FocusStore>((set, get) => ({
  ...initialState,
  focus: (id, message, timeout = 1000) => {
    set((state) => ({
      focusEvent: { id, message },
    }));
    setTimeout(() => {
      set({ focusEvent: null });
    }, timeout);
  },
  isFocused: (id) => {
    return get().focusEvent?.id === id;
  },
})); 
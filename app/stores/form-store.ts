import create from "zustand";

type State = {
  isOpen: boolean;
  actions: {
    open: () => void;
    close: () => void;
  };
};

const useFormStore = create<State>((set) => ({
  isOpen: false,
  actions: {
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  },
}));

export const useFormStoreStates = () => useFormStore((state) => state.isOpen);
export const useFormActions = () => useFormStore((state) => state.actions);

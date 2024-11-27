import { create } from "zustand";

interface ToolbarStore {
  isEdit: boolean;
  toggleIsEdit: () => void;
}

export const useToolbarStore = create<ToolbarStore>((set) => {
  return {
    isEdit: true,
    toggleIsEdit: () => {
      set((state) => ({
        isEdit: !state.isEdit,
      }));
    },
  };
});

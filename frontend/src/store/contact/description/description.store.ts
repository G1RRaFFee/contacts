import { create } from "zustand";

interface DescriptionStoreProps {
  description: boolean;
  toggleDescription: () => void;
}

const useDescriptionStore = create<DescriptionStoreProps>((set) => ({
  description: true,
  toggleDescription: () =>
    set((state) => ({ description: !state.description })),
}));

export default useDescriptionStore;

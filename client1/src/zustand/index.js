import CREATE from "zustand";

const useUserStore = CREATE((set) => ({
  userId: 0,
  increaseId: () => set((state) => ({ userId: state.userId + 1 })),
  resetId: () => set({ userId: 0 }),
  increaseBy: (by) => set((state) => ({ userId: state.userId + by })),
}));

export default useUserStore;

const initialCategories = [
  { id: 1, name: "cat1" },
  { id: 2, name: "cat2" },
];

export const useStateStore = CREATE((set) => ({
  count: 0,
  categories: [],
  setCategories: () => set({ categories: initialCategories }),
}));

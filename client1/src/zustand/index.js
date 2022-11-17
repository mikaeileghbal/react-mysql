import CREATE from "zustand";
import { getAllUsers } from "../api/dataSource";

const useUserStore = CREATE((set) => ({
  editing: false,
  selectedId: -1,
  selectedUser: {},
  userId: 0,
  users: [],
  pageParam: 1,

  setEditing: (mode) => set({ editing: mode }),
  setSelectedId: (id) => set({ selectedId: id }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setPageParam: (page) => set({ pageParam: page }),
  getAllUsers: async (pageParam) => {
    const data = await getAllUsers({ pageParam });
    console.log(data);
    return set({ users: data.data });
  },
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

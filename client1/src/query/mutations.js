import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUser,
  getAllUsers,
  removeUser,
  updateUser,
} from "../api/dataSource";

export const defaultOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
};

export const useQueryUsersAll = (pageParam = 1) => {
  const { isLoading, error, data, status, isError } = useQuery({
    queryKey: ["usersData", pageParam],
    queryFn: () => {
      return getAllUsers({ pageParam });
    },
  });
  return { isLoading, error, data, status, isError };
};

export const useMutateUserCreate = (callback) => {
  return useMutation({
    mutationFn: (user) => createUser(user),
    onSuccess: (data, variables, context) => callback(),
  });
};

export const useMutateUserUpdate = (callback) => {
  return useMutation({
    mutationFn: ({ id, user }) => updateUser(id, user),
    onSuccess: (data, variables, contex) => callback(),
  });
};

export const useMutateUserRemove = (callback) => {
  return useMutation({
    mutationFn: (id) => removeUser(id),
    onSuccess: (data, variables, context) => callback(),
  });
};

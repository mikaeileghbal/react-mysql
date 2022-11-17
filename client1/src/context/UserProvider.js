import React, { createContext, useEffect, useState } from "react";
import {
  createUser,
  getAllUsers,
  removeUser,
  updateUser,
} from "../api/dataSource";

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [state, setState] = useState({
    users: [
      {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    ],
    loading: true,
    editing: false,
    selectedId: -1,
    selectedUser: {},
  });

  const onGetAllUsers = (pageParam) => {
    setLoading(true);
    const { data: users } = getAllUsers({ pageParam: 1 });
    setState({ ...state, users: users });
    setLoading(false);
    onEndEditing();
  };

  const onCreateUser = async (user) => {
    const { message } = await createUser(user);
    console.log(message);
    onGetAllUsers();
  };

  const onUpdateUser = async (id, user) => {
    const { message } = await updateUser(id, user);
    console.log(message);
    onGetAllUsers();
  };

  const onRemoveUser = async (id) => {
    console.log("delete this : ", id);
    if (window.confirm("Are you sure?")) {
      const { message } = await removeUser(id);
      console.log(message);
      onGetAllUsers();
    }
  };

  const onStartEditing = (id, user) => {
    console.log("Update this : ", id, user);
    setState((state) => ({
      ...state,
      editing: true,
      selectedId: id,
      selectedUser: user,
    }));
  };

  const onEndEditing = (message) => {
    setState((state) => ({ ...state, editing: false, selectedId: -1 }));
  };

  const setLoading = (mode) => {
    setState((state) => ({ ...state, loading: mode }));
  };

  useEffect(() => {
    console.log("state:", state);
  }, [state]);

  return (
    <UserContext.Provider
      value={{
        state,
        onGetAllUsers,
        onCreateUser,
        onUpdateUser,
        onRemoveUser,
        setState,
        setLoading,
        onStartEditing,
        onEndEditing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

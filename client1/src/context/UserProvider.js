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

  const onGetAllUsers = async () => {
    setLoading(true);
    const users = await getAllUsers();
    setState({ ...state, users: users });
    setLoading(false);
    onEndEditing();
  };

  const onCreateUser = async (user) => {
    const result = await createUser(user);
    console.log("Create user: ", result);
    onGetAllUsers();
  };

  const onUpdateUser = async (id, user) => {
    const result = await updateUser(id, user);
    console.log(result);
    onGetAllUsers();
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

  const onRemoveUser = async (id) => {
    console.log("delete this : ", id);
    const result = await removeUser(id);
    console.log(result);
    onGetAllUsers();
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

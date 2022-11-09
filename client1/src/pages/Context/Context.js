import React, { useEffect, useState } from "react";
import { CustomTable, Editor, Load } from "../../components";
import UserProvider from "../../context/UserProvider";
import useUserContext, {
  useUserData,
  useLoading,
  useEditing,
  useSelectedId,
  useSelectedUser,
} from "../../context/useUser";
import { EDIT_MODES } from "../../utils";

import "./styles.scss";

export default function Context() {
  return (
    <UserProvider>
      <ContextApp />
    </UserProvider>
  );
}

function ContextApp() {
  const {
    onGetAllUsers,
    onRemoveUser,
    onStartEditing,
    onUpdateUser,
    onEndEditing,
    onCreateUser,
  } = useUserContext();

  const users = useUserData();
  const loading = useLoading();
  const editing = useEditing();
  const selectedId = useSelectedId();
  const selectedUser = useSelectedUser();

  const handleAddNewUser = () => {
    onStartEditing(-1);
  };

  const handleUpdateUser = (id, user) => {
    onStartEditing(id, user);
  };

  useEffect(() => {
    onGetAllUsers();
  }, []);

  useEffect(() => {}, [selectedId]);

  return (
    <div>
      <h1>Context</h1>
      {loading ? (
        <Load />
      ) : (
        <>
          <button
            className="btn btn-success my-2"
            type="button"
            onClick={handleAddNewUser}
            disabled={editing}
          >
            Add new user
          </button>
          <CustomTable
            list={users}
            onEdit={handleUpdateUser}
            onRemove={onRemoveUser}
            editing={editing}
          />
        </>
      )}
      {editing && (
        <Editor
          mode={selectedId === -1 ? EDIT_MODES.CREATE : EDIT_MODES.UPDATE}
          onCreateUser={onCreateUser}
          onUpdateUser={onUpdateUser}
          onEndEditing={onEndEditing}
          user={selectedUser}
        />
      )}
    </div>
  );
}

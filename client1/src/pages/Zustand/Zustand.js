import React, { useEffect } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import Editor from "../../components/Editor/Editor";
import { EDIT_MODES } from "../../utils";
import useUserStore, { useStateStore } from "../../zustand";

import "./styles.scss";

export default function Zustand() {
  const editing = useUserStore((state) => state.editing);
  const selectedId = useUserStore((state) => state.selectedId);
  const selectedUser = useUserStore((state) => state.selectedUser);
  const setSelectedId = useUserStore((state) => state.setSelectedId);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  const pageParam = useUserStore((state) => state.pageParam);
  const setEditing = useUserStore((state) => state.setEditing);
  const getAllUsers = useUserStore((state) => state.getAllUsers);
  const setPageParam = useUserStore((state) => state.setPageParam);

  const users = useUserStore((state) => state.users);
  console.log("users:", users);

  const onStartCreating = () => {
    setEditing(true);
    setSelectedId(-1);
    setSelectedUser({});
  };

  const onStartEditing = (id, users) => {
    setEditing(true);
    setSelectedId(id);
    setSelectedUser(users);
  };

  const onEndEditing = () => {
    setEditing(false);
  };

  const onGetAllUsers = async (pageParam = 1) => {
    console.log("page:", pageParam);
    await getAllUsers(pageParam);
  };

  useEffect(() => {
    onGetAllUsers(pageParam);
  }, [pageParam]);

  return (
    <div>
      <h1>Zustand</h1>
      <>
        <button
          className="btn btn-success my-2"
          type="button"
          disabled={editing}
          onClick={onStartCreating}
        >
          Add new user
        </button>
        {users.length !== 0 ? (
          <CustomTable
            list={users}
            onEdit={onStartEditing}
            //onRemove={onRemoveUser}
            editing={editing}
          />
        ) : null}
        <button
          className="btn btn-info"
          onClick={() => setPageParam(Math.max(pageParam - 1, 1))}
          disabled={pageParam === 1}
        >
          Previeous
        </button>
        <button
          className="btn btn-info mx-2"
          onClick={() => setPageParam(pageParam + 1)}
        >
          Next
        </button>
      </>

      {editing && (
        <Editor
          mode={selectedId === -1 ? EDIT_MODES.CREATE : EDIT_MODES.UPDATE}
          onEndEditing={onEndEditing}
          // onUpdateUser={onUpdateUser}
          // onCreateUser={onCreateUser}
          user={selectedUser}
        />
      )}
    </div>
  );
}

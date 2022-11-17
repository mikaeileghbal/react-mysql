import React, { useEffect, useState } from "react";
import "./styles.scss";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CustomTable, Editor, Load } from "../../components";
import { EDIT_MODES } from "../../utils";
import {
  defaultOptions,
  useMutateUserCreate,
  useMutateUserRemove,
  useMutateUserUpdate,
  useQueryUsersAll,
} from "../../query/mutations";

const queryClient = new QueryClient(defaultOptions);

export default function Query() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryApp />
    </QueryClientProvider>
  );
}

function QueryApp() {
  const [pageParam, setPage] = useState(1);
  const [state, setState] = useState({
    editing: false,
    selectedId: -1,
    selectedUser: {},
  });

  const refreshUsers = () => {
    queryClient.invalidateQueries({ queryKey: ["usersData"] });
  };

  const { isLoading, error, data } = useQueryUsersAll(pageParam);

  const mutationCreate = useMutateUserCreate(refreshUsers);

  const mutationUpdate = useMutateUserUpdate(refreshUsers);

  const mutationRemove = useMutateUserRemove(refreshUsers);

  const onCreateUser = (user) => {
    mutationCreate.mutate(user);
    onEndEditing();
  };

  const onUpdateUser = (id, user) => {
    mutationUpdate.mutate({ id, user });
    onEndEditing();
  };

  const onRemoveUser = (id) => {
    if (window.confirm("Are you sure?")) {
      mutationRemove.mutate(id);
    }
  };

  const onStartCreating = () => {
    setState({ ...state, editing: true, selectedId: -1, selectedUser: {} });
  };

  const onStartEditing = (id, user) => {
    setState({ ...state, editing: true, selectedUser: user, selectedId: id });
  };

  const onEndEditing = () => setState({ ...state, editing: false });

  useEffect(() => {
    console.log(state);
  }, [state]);

  //if (status === "loading") return <Load />;
  //if (isLoading) return <Load />;

  //if (status === "error")
  //if (isError) return <div>Error occured : {error.message}</div>;

  return (
    <div>
      <h1>React-Query</h1>
      {isLoading ? (
        <Load />
      ) : (
        <>
          {mutationUpdate.error && (
            <h3 onClick={() => mutationUpdate.reset()}>
              Error {`${mutationUpdate.error}`}
            </h3>
          )}
          <button
            className="btn btn-success my-2"
            type="button"
            disabled={state.editing}
            onClick={onStartCreating}
          >
            Add new user
            <span
              style={{ display: mutationUpdate.isLoading ? "inline" : "none" }}
            >
              Sending data...
            </span>
          </button>
          <CustomTable
            list={data?.data}
            onEdit={onStartEditing}
            onRemove={onRemoveUser}
            editing={state.editing}
          />
          <button
            className="btn btn-info"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={pageParam === 1}
          >
            Previeous
          </button>
          <button
            className="btn btn-info mx-2"
            onClick={() => setPage((old) => old + 1)}
          >
            Next
          </button>
        </>
      )}

      {state.editing && (
        <Editor
          mode={state.selectedId === -1 ? EDIT_MODES.CREATE : EDIT_MODES.UPDATE}
          onEndEditing={onEndEditing}
          onUpdateUser={onUpdateUser}
          onCreateUser={onCreateUser}
          user={state.selectedUser}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./styles.scss";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
  useMutation,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CustomTable, Editor, Load } from "../../components";
import {
  createUser,
  getAllUsers,
  removeUser,
  updateUser,
} from "../../api/dataSource";
import { EDIT_MODES } from "../../utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

export default function Query() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryApp />
    </QueryClientProvider>
  );
}

function QueryApp() {
  const [page, setPage] = useState(1);
  const [state, setState] = useState({
    editing: false,
    selectedId: -1,
    selectedUser: {},
  });

  const { isLoading, error, data, status, isError } = useQuery({
    queryKey: ["usersData", page],
    queryFn: () => getAllUsers(page),
  });

  const mutationCreate = useMutation({
    mutationFn: (user) => createUser(user),
    onSuccess: (data, variables, context) => {
      refreshUsers();
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, user }) => updateUser(id, user),
    onMutate: (variables) => {
      console.log("variables: ", variables);
      return { id: variables.id, user: variables.user };
    },
    onError: (error, variables, context) => {
      console.log(`Rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (data, variables, context) => {
      refreshUsers();
    },
    onSettled: (data, error, variables, context) => {},
  });

  const mutationRemove = useMutation({
    mutationFn: (id) => removeUser(id),
    onSuccess: () => {
      refreshUsers();
    },
  });

  const refreshUsers = () => {
    queryClient.invalidateQueries({ queryKey: ["usersData"] });
  };
  const onCreateUser = (user) => {
    mutationCreate.mutate(user);
    onEndEditing();
  };

  const onUpdateUser = (id, user) => {
    mutationUpdate.mutate(
      { id, user },
      {
        onSuccess: () => {},
        onError: () => {},
        onSettled: () => {},
      }
    );
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
            disabled={page === 1}
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

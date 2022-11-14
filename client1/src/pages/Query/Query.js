import React, { useEffect, useState } from "react";
import "./styles.scss";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
  useMutation,
  useQueries,
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

const users = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

function fetchUserById(id) {
  console.log("fetch user by id: ", id);
  return users[id - 1];
}

export default function Query() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryApp />
    </QueryClientProvider>
  );
}

function QueryApp() {
  // Parallel Queries
  // Not used in app
  // const userQueries = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["user", 1],
  //       queryFn: () => fetchUserById(1),
  //     },
  //     {
  //       queryKey: ["user", 2],
  //       queryFn: () => fetchUserById(2),
  //     },
  //   ],
  // });

  const userQueriesDynamic = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ["users", user.id],
        queryFn: () => fetchUserById(user.id),
      };
    }),
  });

  const [state, setState] = useState({
    editing: false,
    selectedId: -1,
    selectedUser: {},
  });
  const { isLoading, error, data, status, isError } = useQuery({
    queryKey: ["usersData"],
    queryFn: getAllUsers,
  });

  const mutationCreate = useMutation({
    mutationFn: (user) => createUser(user),
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
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  });

  const mutationRemove = useMutation({
    mutationFn: (id) => removeUser(id),
  });

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
            list={data.data}
            onEdit={onStartEditing}
            onRemove={onRemoveUser}
            editing={state.editing}
          />
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

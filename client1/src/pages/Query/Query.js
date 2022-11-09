import React from "react";
import "./styles.scss";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { CustomTable, Load } from "../../components";
import { getAllUsers } from "../../query/query-api";

const queryClient = new QueryClient();

export default function Query() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryApp />
    </QueryClientProvider>
  );
}

function QueryApp() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: getAllUsers,
  });

  console.log(data);

  if (isLoading) return <Load />;

  if (error) return <div>Error occured</div>;

  return (
    <div>
      <h1>React-Query</h1>
      <>
        <button
          className="btn btn-success my-2"
          type="button"
          //disabled={editing}
          //onClick={onStartCreating}
        >
          Add new user
        </button>
        <CustomTable
          list={data.data}
          //onEdit={onStartEditing}
          //onRemove={onRemoveUser}
          //editing={editing}
        />
      </>

      {/* {editing && (
        <Editor
          mode={selectedId === -1 ? EDIT_MODES.CREATE : EDIT_MODES.UPDATE}
          onEndEditing={onEndEditing}
          onUpdateUser={onUpdateUser}
          onCreateUser={onCreateUser}
          user={selectedUser}
        />
      )} */}
    </div>
  );
}

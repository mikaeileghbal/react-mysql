import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchTodos = (filter) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "Dinner" },
        { id: 2, text: "Meeting" },
      ]);
    }, 2000);
  });
};

export default function Disable() {
  const { data, isInitialLoading, isError, error, isFetching, refetch } =
    useQuery({
      queryKey: ["todos"],
      queryFn: fetchTodos,
      enabled: false,
    });

  return (
    <div>
      <h2>Disabling/Pausing Queries</h2>
      <button onClick={() => refetch()}>Fetch Todos</button>
      {data ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      ) : isError ? (
        <span>Error : {error.message}</span>
      ) : isInitialLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready...</span>
      )}

      {isFetching ? <div>Fetching...</div> : null}
    </div>
  );
}

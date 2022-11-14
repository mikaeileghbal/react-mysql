import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

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

export default function Parallel() {
  return (
    <QueryClientProvider client={queryClient}>
      <ParallelApp />
    </QueryClientProvider>
  );
}

const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Michael" });
    }, 2000);
  });
};

const fetchProjects = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "project 1" },
        { id: 2, name: "project 2" },
        { id: 3, name: "project 3" },
        { id: 4, name: "project 4" },
      ]);
    }, 2000);
  });
};

function ParallelApp() {
  const { isLoading: userIsLoading, data: user } = useQuery({
    queryKey: ["user", 1],
    queryFn: () => fetchUser(1),
  });

  const userId = user?.id;

  const { isLoading: projectsIsLoading, data: projects } = useQuery({
    queryKey: ["projects", userId],
    queryFn: () => fetchProjects(userId),
    enabled: !!userId,
  });

  return (
    <div>
      {userIsLoading ? <div>User Loading...</div> : <p>{user.name}</p>}
      {projectsIsLoading ? (
        <div>Projects Loading...</div>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

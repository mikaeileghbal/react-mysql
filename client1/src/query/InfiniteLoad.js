import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { getAllUsers } from "../api/dataSource";

export default function InfiniteLoad() {
  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    getNextPageParam: (lastPage, pages) => {
      console.log("last page", lastPage);
      return Number(lastPage.meta.page) + 1;
    },
  });

  const onRefetch = () => {
    refetch({ refetchPage: (page, index) => index === 0 });
  };

  const skipToPage = (pageNum) => fetchNextPage({ pageParam: pageNum });

  return status === "loading" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>Error : {error.message}</div>
  ) : (
    <>
      {data.pages.map((group, i) => {
        console.log("group:", group);
        return (
          <Fragment key={i}>
            {group.data.map((user) => (
              <p key={user.id}>
                {user.firstName} {user.lastName} {user.email}
              </p>
            ))}
          </Fragment>
        );
      })}
      <div>
        <button
          onClick={() => fetchNextPage()}
          // disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
        <button onClick={onRefetch}>ReFetch Ony Page 0</button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}

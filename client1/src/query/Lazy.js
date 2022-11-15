import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const books = [
  {
    id: 1,
    title: "Redux",
  },
  {
    id: 2,
    title: "React",
  },
  {
    id: 3,
    title: "Query",
  },
  {
    id: 4,
    title: "Zustand",
  },
];

const fetchBooks = (filter) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books.filter((book) => book.title.includes(filter)));
    }, 500);
  });
};

export default function Lazy() {
  const [filter, setFilter] = useState("");
  const { data } = useQuery({
    queryKey: ["books", filter],
    queryFn: () => fetchBooks(filter),
  });

  return (
    <div>
      <h2>Lazy Query</h2>
      <form>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

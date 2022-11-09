import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import reactIcon from "../../assets/react.png";
import reduxIcon from "../../assets/redux.png";
import queryIcon from "../../assets/query.png";
import zustandIcon from "../../assets/zustand.jpg";

const menuList = [
  {
    id: 1,
    to: "/context",
    title: "Database API using Context",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cupiditate,nisi a velit consectetur fugiat dolorem placeat voluptas qui voluptatum! Perferendis sequi assumenda quasi possimus, similique ut id mollitia!Reprehenderit?",
    icon: reactIcon,
  },
  {
    id: 2,
    to: "/redux",
    title: "Database API using Redux",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cupiditate,nisi a velit consectetur fugiat dolorem placeat voluptas qui voluptatum! Perferendis sequi assumenda quasi possimus, similique ut id mollitia!Reprehenderit?",
    icon: reduxIcon,
  },
  {
    id: 3,
    to: "/reactquery",
    title: "Database API using React Query",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cupiditate,nisi a velit consectetur fugiat dolorem placeat voluptas qui voluptatum! Perferendis sequi assumenda quasi possimus, similique ut id mollitia!Reprehenderit?",
    icon: queryIcon,
  },
  {
    id: 4,
    to: "/zustand",
    title: "Database API using Zustand",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cupiditate,nisi a velit consectetur fugiat dolorem placeat voluptas qui voluptatum! Perferendis sequi assumenda quasi possimus, similique ut id mollitia!Reprehenderit?",
    icon: zustandIcon,
  },
];
export default function Home() {
  return (
    <div>
      <h1 className="card-title">
        Consuming a RESTful api connected to MySQL database
      </h1>
      <MenuList list={menuList} />
    </div>
  );
}

function MenuList({ list }) {
  return (
    <div className="card-wrap">
      {list.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function MenuItem({ item }) {
  return (
    <Link to={item.to}>
      <article className="mb-2 p-4 card d-flex flex-row">
        <img
          className="card-icon align-self-start"
          src={item.icon}
          alt={item.title}
        />
        <div className="card-content">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      </article>
    </Link>
  );
}

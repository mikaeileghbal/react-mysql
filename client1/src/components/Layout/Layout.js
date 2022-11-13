import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";
import "./styles.scss";

const mainMenu = [
  {
    id: 1,
    to: "/",
    text: "Home",
  },
  {
    id: 2,
    to: "/context",
    text: "Context",
  },
  {
    id: 3,
    to: "/redux",
    text: "Redux",
  },
  {
    id: 4,
    to: "/reactquery",
    text: "Query",
  },
  {
    id: 5,
    to: "/zustand",
    text: "Zustand",
  },
];

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col p-0 side-col">
            <aside className="px-4">
              <SideNav items={mainMenu} />
            </aside>
          </div>
          <div className="col p-0">
            <main className="">
              <div className="container-fluid">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

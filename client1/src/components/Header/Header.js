import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="container-fluid d-flex aligh-items-centr">
          <NavLink className="navbar-brand text-light">fullstack</NavLink>
          <TopMenu />
        </div>
      </nav>
    </header>
  );
}

function TopMenu() {
  return (
    <div>
      <List>
        <ListItem>
          <NavLink to="/">home</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/context">about</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/redux">contact</NavLink>
        </ListItem>
      </List>
    </div>
  );
}

function List({ children }) {
  return <ul className="topmenu">{children}</ul>;
}

function ListItem({ children }) {
  return <li className="topmenu-item">{children}</li>;
}

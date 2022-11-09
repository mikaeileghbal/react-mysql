import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

export default function SideNav({ items }) {
  return (
    <nav className="nav d-flex flex-column ">
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <NavLink
              to={item.to}
              activeClassName="active"
              className="btn btn-primary side-link"
              end
            >
              {item.text}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </nav>
  );
}

function List({ children }) {
  return <ul className="sidemenu">{children}</ul>;
}

function ListItem({ children }) {
  return <li>{children}</li>;
}

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  const [active, setActive] = useState(true);

  return (
    <div className={classes.NavBar}>
      <NavLink
        to="/"
        className={classes.NavItem}
        isActive={(match) => {
          if (!match) {
            return false;
          }
          setActive(true);
        }}
      >
        <div className={classes.NavIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={!active ? "#AEAEAE" : "white"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <div className={classes.NavName}>Home</div>
      </NavLink>
      <NavLink
        to="/stream"
        className={classes.NavItem}
        isActive={(match) => {
          if (!match) {
            return false;
          }
          setActive(false);
        }}
      >
        <div className={classes.NavIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={active ? "#AEAEAE" : "white"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className={classes.NavName}>Stream</div>
      </NavLink>
    </div>
  );
};

export default NavBar;

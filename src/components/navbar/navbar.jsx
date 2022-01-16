import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <h1>
            <Link to="/">TOP</Link>
          </h1>
          <ul>
            <Link to="/totalUser">
              <li className="navbar-item">Total User</li>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

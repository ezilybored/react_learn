import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg main-nav">
      <Link className="navbar-brand" to="/">
        <h2 className="LL-title">LACKLUSTRE VIDEO</h2>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link main-nav-text" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link main-nav-text" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link main-nav-text" to="/rentals">
            Rentals
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

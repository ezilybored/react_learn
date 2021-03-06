import React from "react";
import { NavLink, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import auth from "../services/authService";

const NavBar = ({ user }) => {
  const adminCheck = auth.getCurrentUser();
  return (
    // Old style non-React bootstrap version of the navbar
    /*
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
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav ml-auto">
          <NavLink className="nav-item nav-link main-nav-text" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link main-nav-text" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link main-nav-text" to="/rentals">
            Rentals
          </NavLink>
          <NavLink className="nav-item nav-link main-nav-text" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
    */
    <Navbar collapseOnSelect="true" className="main-nav" expand="lg">
      <Navbar.Brand href="/">
        <h2 className="LL-title">LACKLUSTRE VIDEO</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto main-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            <p className="main-nav-text">Movies</p>
          </NavLink>
          {user && adminCheck.isAdmin && (
            <NavLink className="nav-item nav-link" to="/customers">
              <p className="main-nav-text">Customers</p>
            </NavLink>
          )}
          {user && adminCheck.isAdmin && (
            <NavLink className="nav-item nav-link" to="/rentals">
              <p className="main-nav-text">Rentals</p>
            </NavLink>
          )}
          {/* Login and register are rendered conditionally */}
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                <p className="main-nav-text">Login</p>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                <p className="main-nav-text">Register</p>
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                <p className="main-nav-text">{user.name}'s-account</p>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                <p className="main-nav-text">Logout</p>
              </NavLink>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

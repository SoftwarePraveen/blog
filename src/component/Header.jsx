import React from "react";
import { Link } from "react-router-dom";
import transitions from 'bootstrap'

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <button
            className="navbar-toggler mt-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportContent"
            aria-controls="navbarSupportContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to="/" style={{ textDecoration: "none" }}>
                <li
                  className={`nav-item nav-link ${
                    active === "home" ? "active" : ""
                  }`}
                  onClick={() => setActive("home")}
                >
                  Home
                </li>
              </Link>
              <Link to="/about" style={{ textDecoration: "none" }}>
                <li
                  className={`nav-item nav-link ${
                    active === "about" ? "active" : ""
                  }`}
                  onClick={() => setActive("about")}
                >
                  About
                </li>
              </Link>
              <Link to="/create" style={{ textDecoration: "none" }}>
                <li
                  className={`nav-item nav-link ${
                    active === "create" ? "active" : ""
                  }`}
                  onClick={() => setActive("create")}
                >
                  Create
                </li>
              </Link>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userId ? (
                <>
                  <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                    {user?.displayName}
                  </p>
                  <li className="nav-item nav-Links" onClick={handleLogout}>
                    Logout
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => setActive("login")}
                    to="/auth"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

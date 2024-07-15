import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary
import "../css/header.css";

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Using the authentication context
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let name = "";
    switch (location.pathname) {
      case "/posts":
        name = "Blogg";
        break;
      case "/about":
        name = "Varför?";
        break;
      default:
        name = "";
    }
    document.title = name !== "" ? `Franca's - ${name}` : "Franca's"; // Set document title based on page
  }, [location.pathname]); // Add location.pathname as dependency to useEffect

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/posts">
            <img src="/Franca's_transparent.png" alt="logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/posts" className={location.pathname === "/posts" ? "active" : ""}>
              Blogg
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
              Varför?
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout}>Logga ut</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

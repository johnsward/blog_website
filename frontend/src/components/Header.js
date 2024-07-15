import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary
import "../css/header.css";

const Header = () => {
  const [setName] = useState("");
  const { isAuthenticated, logout } = useAuth(); // Using the authentication context
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case "/posts":
        setName("Blog");
        break;
      case "/create":
        setName("Create Post");
        break;
      case "/manage":
        setName("Manage Posts");
        break;
      default:
        setName("");
    }
  }, [location.pathname]);

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
          <li><Link to="/posts" className={location.pathname === "/posts" ? "active" : ""}>Blogg</Link></li>
          <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>Varför?</Link></li>
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

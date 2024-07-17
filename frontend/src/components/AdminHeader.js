import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/adminheader.css";
import { useAuth } from "../context/AuthContext";

const AdminHeader = () => {
  const { isAuthenticated, logout } = useAuth(); // Using the authentication context
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let name = "";
    switch (location.pathname) {
      case "/admin/posts":
        name = "Blog";
        break;
      case "/admin/create":
        name = "Create Post";
        break;
      case "/admin/manage":
        name = "Manage Posts";
        break;
      default:
        name = "";
    }
    document.title = `Admin - ${name}`; // Set document title based on page
  }, [location.pathname]); // Add location.pathname as dependency to useEffect

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  }

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
            <Link to="/admin/posts" className={location.pathname === "/admin/posts" ? "active" : ""}>Blogg</Link>
          </li>
          <li>
            <Link to="/admin/create" className={location.pathname === "/admin/create" ? "active" : ""}>Skapa inlägg</Link>
          </li>
          <li>
            <Link to="/admin/manage" className={location.pathname === "/admin/manage" ? "active" : ""}>Hantera inlägg</Link>
          </li>
          <button onClick={handleLogout}>Logga ut</button>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;

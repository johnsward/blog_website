import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import "../css/blogaccess.css";
import Lock from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const BlogAccess = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); // Use the login function from context
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(null, password); // Invoke login with password only
      navigate("/posts"); // Navigate to the protected blog content on success
    } catch (error) {
      alert("Incorrect Password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return  (
    <div className="blogAccess-container">
      <video autoPlay loop muted className="background-video">
        <source src="/12315333-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="blogAccess-content">
        <div className="blogAccess-header">
          <img src="/Franca's_transparent.png" alt="Franca's logo" className="logo" />
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <span
                type="button"
                onClick={togglePasswordVisibility}
                className="visibility-icon"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            <button className="login-btn" type="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogAccess;

import React, { useState } from "react";
import "../css/postlist.css";
import { subscribe } from "../services/subscribeService";
import "../css/subscribeform.css";
import MailIcon from "@mui/icons-material/Mail";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await subscribe(email);
      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(""), 5000); 
      setEmail("");
    } catch (e) {
      if (e.response) {
        setErrorMessage(e.response.data.error || "Server error");
        setTimeout(() => setErrorMessage(""), 5000);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };

  return (
    <div className="subscribe-main">
      <div className="subscribe-form">
        <form onSubmit={handleSubmit}>
          <div className="mail">
            <MailIcon className="mail-icon" />
          </div>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="subscribe-btn">
            Subscribe
          </button>
        </form>
      </div>
      {successMessage && (
        <div className="success-message">
          <p className="message">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          <p className="message">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SubscribeForm;

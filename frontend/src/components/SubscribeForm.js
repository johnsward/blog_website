import React, { useState } from "react";
import "../css/postlist.css";
import { subscribe } from "../services/subscribeService";
import '../css/subscribeform.css';
import MailIcon from "@mui/icons-material/Mail";

const SubscribeForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await subscribe(email);
            setMessage(response.data.message);
            setEmail('');
        } catch (e) {
            if (e.response) {
                setMessage(e.response.data.error || 'Server error');
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    };


    return (
        <div className="subscribe-form">
            <form onSubmit={handleSubmit}>
                <div className="mail">
                    <MailIcon className="mail-icon" />
                </div>
                <input
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="subscribe-btn">Subscribe</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default SubscribeForm;

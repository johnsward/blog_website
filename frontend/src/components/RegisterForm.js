import React, { useState } from 'react';
import axios from 'axios';
import '../css/registerform.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                email: email,
                password: password,
            });
            console.log('User registered:', response.data);
            // Additional actions based on success (e.g., redirect or display success message)
        } catch (err) {
            setError(err.response.data.message || 'Failed to register');
        }
    };

    return (
        <div className="register-container">
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
        </div>
    );
};

export default RegisterForm;

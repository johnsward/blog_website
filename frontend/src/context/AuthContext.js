import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            validateToken(token);
        } else {
            setLoading(false); // No token, stop loading
        }
    }, []);

    const validateToken = async (token) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/validateToken`,
                { token }
            );
            if (response.status === 200) {
                const userFromResponse = response.data.user;
                setIsAuthenticated(true);
                setUser(userFromResponse);
                localStorage.setItem("user", JSON.stringify(userFromResponse));
            } else {
                logout();
            }
        } catch (e) {
            console.error("Token validation error:", e);
            logout();
        } finally {
            setLoading(false); // Validation done, stop loading
        }
    };

    const login = async (email, password, isAdmin = false) => {
        const endpoint = isAdmin ? "/auth/admin/login" : "/auth/login";
        const payload = isAdmin ? { email, password } : { password };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}${endpoint}`,
                payload
            );
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuthenticated(true);
            setUser(user);

            return Promise.resolve(token);
        } catch (error) {
            console.error(
                "Login error:",
                error.response ? error.response.data : "No response"
            );
            setIsAuthenticated(false);
            setUser(null);
            return Promise.reject(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>; // Add a loading state while validation is happening
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

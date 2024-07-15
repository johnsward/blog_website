import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const validateToken = async (token) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/validateToken`,
                { token }
            );
            const { user: userFromResponse } = response.data;
            setIsAuthenticated(true);
            setUser(userFromResponse);
            localStorage.setItem("user", JSON.stringify(userFromResponse));
        } catch (error) {
            console.error("Token validation error:", error);
            logout();
        } finally {
            setLoading(false); // Validation done, stop loading
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            validateToken(token); // Use validateToken directly
        } else {
            setLoading(false); // No token, stop loading
        }
    }, [validateToken]); // Include validateToken in the dependency array

    const login = async (email, password, isAdmin = false) => {
        const endpoint = isAdmin ? "/auth/admin/login" : "/auth/login";
        const payload = isAdmin ? { email, password } : { password };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}${endpoint}`,
                payload
            );
            const { token, user: userFromResponse } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userFromResponse));
            setIsAuthenticated(true);
            setUser(userFromResponse);
            return token;
        } catch (error) {
            console.error("Login error:", error);
            setIsAuthenticated(false);
            setUser(null);
            throw error;
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

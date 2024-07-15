import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                setLoading(false);
            }
        };

        const token = localStorage.getItem("token");
        if (token) {
            validateToken(token);
        } else {
            setLoading(false);
        }
    }, []); // Empty dependency array because validateToken does not change

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

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

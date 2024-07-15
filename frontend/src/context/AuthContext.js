import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading state

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
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        const token = localStorage.getItem("token");
        if (token) {
            validateToken(token);
        } else {
            setLoading(false); // No token, stop loading
        }
    }, []); // Empty dependency array because validateToken does not depend on any props or state

    const login = async (email, password, isAdmin = false) => {
        setLoading(true); // Start loading before login process begins

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
        } finally {
            setLoading(false); // Stop loading after login attempt
        }
    };

    const logout = () => {
        setLoading(true); // Start loading before logout process begins

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);

        setLoading(false); // Stop loading after logout
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while processes are ongoing
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

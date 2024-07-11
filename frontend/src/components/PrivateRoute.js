import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated, user } = useAuth();

    console.log("PrivateRoute isAuthenticated:", isAuthenticated); // Debugging statement
    console.log("PrivateRoute user:", user); // Debugging statement

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;

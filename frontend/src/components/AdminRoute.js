import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { isAuthenticated, user } = useAuth();

    console.log("AdminRoute isAuthenticated:", isAuthenticated); // Debugging statement
    console.log("AdminRoute user:", user); // Debugging statement

    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/admin/login" replace />;
    }
    return <Outlet />;
};

export default AdminRoute;

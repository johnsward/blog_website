// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import Login from './components/BlogAccess';
import AdminLogin from './components/AdminLogin';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import ManagePosts from './components/ManagePosts';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import About from './components/About';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

const AppContent = () => {
    const location = useLocation();
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Display loading while authentication state is being resolved
    }

    const isAdminRoute = location.pathname.startsWith('/admin');
    const isLoginRoute = location.pathname === '/login' || location.pathname === '/admin/login';

    return (
        <div>
            {!isLoginRoute && (isAuthenticated && (isAdminRoute ? <AdminHeader /> : <Header />))}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/about" element={<About /> } />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/" element={<PostList />} />
                </Route>
                <Route element={<AdminRoute />}>
                    <Route path="/admin/create" element={<PostForm />} />
                    <Route path="/admin/manage" element={<ManagePosts />} />
                    <Route path="/admin/posts" element={<PostList />} />
                    <Route path="/admin/posts/:id" element={<PostDetail />} />
                    <Route path="/admin" element={<ManagePosts />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;

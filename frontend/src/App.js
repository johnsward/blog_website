import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Header from './components/Header';
import ManagePosts from './components/ManagePosts';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <Header />
                </nav>
                <Routes>
                    <Route path="/create" element={<PostForm />} />
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/manage" element={<ManagePosts />} />
                    <Route path="/" element={<PostList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

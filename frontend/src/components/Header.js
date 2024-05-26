import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';
import backgroundVideo from '../resources/videos/2048452-hd_1920_1080_30fps.mp4';
import { Search } from '@mui/icons-material';

const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <div className="logo">
                        <h1>Franca's</h1>
                    </div>
                    <ul className="nav-links">
                        <li><Link to="/posts">Blog</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/create">Create Post</Link></li>
                        <li><Link to="/manage">Manage Posts</Link></li>
                    </ul>
                    <div className="header-buttons">
                        <button className="subscribe">Subscribe</button>
                    </div>
                </nav>
            </header>
            <div className="background-header">
                <div className="video-background">
                    <video autoPlay muted loop>
                        <source src={backgroundVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="header-content">
                    <p>My blog</p>
                    <h1>Stories & ideas</h1>
                    <p className="pStory">An insight to my life, for the one's who cares.</p>
                </div>
            </div>
        </>
    );
};

export default Header;

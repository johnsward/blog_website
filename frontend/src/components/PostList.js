import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/postService';
import { Link } from 'react-router-dom';
import '../css/postlist.css';
import RightArrowIcon from '@mui/icons-material/ArrowForward';
import RightArrowIosIcon from '@mui/icons-material/ArrowForwardIos';
import LeftArrowIosIcon from '@mui/icons-material/ArrowBackIos';
import brownieImage from '../resources/images/classic-chocolate-brownies.jpeg';
import cupcakeImage from '../resources/images/cupcake.jpeg';
import beachImage from '../resources/images/beach.jpeg';
import SubscribeForm from './SubscribeForm';


const PostList = () => {
    const [email, setEmail] = useState('');
    const [posts, setPosts] = useState([]);
    const [latestPost, setLatestPost] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await fetchPosts();
                if (data.length > 0) {
                    const latest = data.reduce((prev, current) =>
                        new Date(prev.date) > new Date(current.date) ? prev : current
                    );
                    setLatestPost(latest);
                    setPosts(data.filter(post => post._id !== latest._id));
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        getPosts();
    }, []);

    const groupedPosts = posts.reduce((acc, post) => {
        const date = new Date(post.date);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(post);
        return acc;
    }, {});

    const handleSubscribe = () => {
        console.log('Subscribed with email:', email);
    };

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentSidebarPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='main'>
            <div className="post-list-container">
                <div className="latest-post-container">
                    {latestPost && (
                        <div className="latest-post">
                            {latestPost.imageUrls && latestPost.imageUrls.length > 0 && (
                                <img src={`http://localhost:5001${latestPost.imageUrls[0]}`} alt={latestPost.title} className="post-image" />
                            )}
                            <div className="latest-info-container">
                                <div className="label-container">
                                    {latestPost.label && <p className="post-label">{latestPost.label}</p>}
                                </div>
                                <h2>{latestPost.title}</h2>
                                <div className="latest-bottom-container">
                                    {latestPost.date && <p className="post-date">{new Date(latestPost.date).toDateString()}</p>}
                                    <Link to={`/posts/${latestPost._id}`} className="latest-read-more"><RightArrowIcon className="right-icon" /></Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="sidebar">
                    <div className="sidebar-posts">
                        {currentSidebarPosts.map(post => (
                            <div key={post._id} className="sidebar-post">
                                <div className="sidebar-info-container">
                                    <div className="label-container">
                                        {post.label && <p className="post-label">{post.label}</p>}
                                    </div>
                                    <h4>{post.title}</h4>
                                    <div className="sidebar-bottom-container">
                                        {post.date && <p className="post-date">{new Date(post.date).toDateString()}</p>}
                                        <Link to={`/posts/${post._id}`} className="sidebar-read-more"><RightArrowIcon className="right-icon" /></Link>
                                    </div>
                                </div>
                                {post.imageUrls && post.imageUrls.length > 0 && (
                                    <img src={`http://localhost:5001${post.imageUrls[0]}`} alt={post.title} className="sidebar-image" />
                                )}

                            </div>
                        ))}
                    </div>
                    <div className="sidebar-pagination">
                        <button className="sidebar-right-icon" disabled={currentPage === 1} onClick={handlePreviousPage}><LeftArrowIosIcon /></button>
                        <p className="page-info">{currentPage} of {totalPages}</p>
                        <button className="sidebar-left-icon" disabled={currentPage >= totalPages} onClick={handleNextPage}><RightArrowIosIcon /></button>
                    </div>

                </div>
            </div>

            <div className="additional-content-container">
                <div className="additional-images">
                    <h2>Gallery</h2>
                    <div className="additional-image-container1">
                        <div className="additional-image1">
                            <img src={brownieImage} alt="Brownies" />
                        </div>
                        <div className="additional-image2">
                            <img src={cupcakeImage} alt="Franca" />
                        </div>
                        <div className="additional-image3">
                            <img src={beachImage} alt="Beach" />
                        </div>
                    </div>
                    <div className="additional-image-container2">
                        <div className="additional-image4">
                            <img src={beachImage} alt="Beach" />
                        </div>
                        <div className="additional-image5">
                            <img src={cupcakeImage} alt="Franca" />
                        </div>
                        <div className="additional-image6">
                            <img src={brownieImage} alt="Brownies" />
                        </div>
                    </div>
                </div>
                <div className="most-popular">
                    <h2>MOST POPULAR</h2>
                    <div className="most-popular-posts">
                        {posts.map(post => (
                            <Link to={`/posts/${post._id}`} key={post._id} className="popular-post">
                                <h3>{post.title}</h3>
                                <RightArrowIosIcon className="right-icon" />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="most-recent">
                    <h2>RECENT POSTS</h2>
                    <div className="most-recent-posts">
                        {Object.keys(groupedPosts).map(monthYear => (
                            <div key={monthYear} className="month-posts">
                                <h3>{monthYear}</h3>
                                <RightArrowIosIcon className="right-icon" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className="never-miss-container">
                <div className="never-miss">
                    <div className="never-miss-content">
                        <h2>NEVER MISS AN UPDATE</h2>
                        <p>GET MY POSTS STRAIGHT TO YOUR INBOX</p>
                    </div>
                    <SubscribeForm />
                </div>
            </div>

            <div className="footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="/posts">Blog</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                    </div>
                    <div className="footer-social">
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostList;

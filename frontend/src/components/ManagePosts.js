import React, { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../services/postService';
import '../css/manageposts.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); 
    const [activePost, setActivePost] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await fetchPosts();
                console.log('Fetched posts:', data); // Debug log
                setPosts(data);
                setFilteredPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        getPosts();
    }, []);

    const handleMenuClick = (postId) => {
        setActivePost(activePost === postId ? null : postId);
    };



    const handleRemove = async (postId) => {
        console.log("Remove post:", postId);
        try {
            await deletePost(postId);
            setPosts(posts.filter(post => post._id !== postId));
            setFilteredPosts(filteredPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const matchedPosts = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm)
        );
        setFilteredPosts(matchedPosts);
    };

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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
        <div className='manage-posts-container'>
            <div className='top-container'>
                <div className='search-bar'>
                    <div className='search-icon-container'>
                        <SearchIcon className='search-icon' />
                    </div>
                    <input type='text' placeholder='Search posts' className='search-input' onChange={handleSearch} />
                </div>
            </div>
            <div className='pagination'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            <div className='manage-posts'>
                {currentPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(post => (
                    <div key={post._id} className="manage-card">
                        <MenuIcon className='menu-icon' onClick={() => handleMenuClick(post._id)} />
                        {activePost === post._id && (
                            <div className='dropdown-menu'>
                                <button onClick={() => handleRemove(post._id)}>Remove</button>
                            </div>
                        )}
                        <div className='post-title'><h2>{post.title}</h2></div>
                        <p>{post.content}</p>
                        {post.imageUrls && post.imageUrls.length > 0 && (
                            <div className="post-images">
                                {post.imageUrls.map((imageUrl, index) => (
                                    <img key={index} src={`${baseUrl}${imageUrl}`} alt={`${post.title} ${index + 1}`} className="post-image" />
                                ))}
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default ManagePosts;

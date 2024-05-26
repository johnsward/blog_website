import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import '../css/postlist.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await fetchPosts();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        getPosts();
    }, []);

    return (
        <div className="post-list-container">
            <div className="posts">
                {posts.map(post => (
                    <div key={post._id} className="post-card">
                        <h2>{post.title}</h2>
                        <p className="post-content">{post.content}</p>
                        {post.imageUrl && <img src={`http://localhost:5001${post.imageUrl}`} alt={post.title} />}
                        {post.videoUrl && (
                            <video width="100%" height="auto" controls>
                                <source src={`http://localhost:5001${post.videoUrl}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                ))}
            </div>
            <div  className="post-list-sidebar">
                <h3>Recent Posts</h3>
                <ul>
                    {posts.map(post => (
                        <li key={post._id}>{post.title}</li>
                    ))}
                </ul>
                </div>
        </div>
    );
};

export default PostList;

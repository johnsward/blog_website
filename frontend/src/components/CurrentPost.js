import React from 'react';

const CurrentPost = ({ post }) => {
    return (
        <div className="current-post-container">
        <img src={post.image} alt="Post" />
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            
        </div>
    );
}

export default CurrentPost;
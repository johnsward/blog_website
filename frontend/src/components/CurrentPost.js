import React from "react";
import '../currentpost.css';

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const CurrentPost = ({ post }) => {
  return (
    <div className="current-post-container">
      <div className="image-container">
        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="post-images">
            {post.imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={`${baseUrl}${imageUrl}`}
                alt={`${post.title} ${index + 1}`}
                className="post-image"
              />
            ))}
          </div>
        )}
      </div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default CurrentPost;

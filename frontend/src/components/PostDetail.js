import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../services/postService';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const { data } = await fetchPostById(id);
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getPost();
    }, [id]);

    if (loading) return <div>Loading...</div>; // Show loading message

    if (error) return <div>Error: {error}</div>; // Show error message

    if (!post) return <div>No post found</div>; // Handle case where post is not found


    return (
        <div className="post-detail">
            
            {post.imageUrls.map((url, index) => (
                <img key={index} src={`http://localhost:5001${url}`} alt={post.title} />
            ))}
            {post.videoUrl && (
                <video controls>
                    <source src={`http://localhost:5001${post.videoUrl}`} type="video/mp4" />
                </video>
            )}
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default PostDetail;
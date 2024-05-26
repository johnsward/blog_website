import React, { useState } from 'react';
import { createPost } from '../api';
import '../css/postform.css';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image);
        if (video) formData.append('video', video);

        try {
            await createPost(formData);
            setTitle('');
            setContent('');
            setImage(null);
            setVideo(null);
            alert('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
            />
            <button type="submit">Create Post</button>
        
        </form>
   
        
    );
};

export default PostForm;

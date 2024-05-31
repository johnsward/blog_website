import React, { useState } from 'react';
import { createPost } from '../services/postService';
import '../css/postform.css';
import ImageGrid from './ImageGrid';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [label, setLabel] = useState('');
    const [files, setFiles] = useState([]);

    const handleDrop = (newFiles) => {
        setFiles(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('date', date);
        formData.append('label', label);
        files.forEach((file, index) => {
            formData.append('images', file); // Ensure field name matches multer configuration
        });

        try {
            await createPost(formData);
            setTitle('');
            setContent('');
            setFiles([]);
            setDate('');
            setLabel('');
            alert('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="create-post-container">

            <form onSubmit={handleSubmit}>
                <div className="text-container">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <textarea
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="drop-container">
                    <ImageGrid onDrop={handleDrop} />
                </div>
                <div className="create-btn">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;

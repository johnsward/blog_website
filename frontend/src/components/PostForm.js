import React, { useState, useEffect } from "react";
import { fetchPosts } from "../services/postService";
import { createPost } from "../services/postService";
import "../css/postform.css";
import FileGrid from "./FileGrid";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [labels, setLabels] = useState([]);
  const [label, setLabel] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getLabels = async () => {
      try {
        const { data } = await fetchPosts();
        const labels = Array.from(new Set(data.map((post) => post.label).filter(Boolean)));
        setLabels(labels);
      } catch (error) {
          console.log('error fetching labels:', error);
      }
  }; getLabels(); }, []);

  const handleDrop = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("label", label);
    
    files.forEach((file) => {
      if (file && file.type) {
        if (file.type.startsWith('image/')) {
          formData.append("images", file);
        } else if (file.type.startsWith('video/')) {
          formData.append("videos", file);
        }
      };
    });
    

    try {
      await createPost(formData);
      setTitle("");
      setContent("");
      setFiles([]);
      setDate("");
      setLabel("");
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
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
            <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          >
            <option value="">Select Label</option>
            {labels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="drop-container">
          <FileGrid onDrop={handleDrop} />
        </div>
        <div className="create-btn">
          <button type="submit">Send it baby!</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

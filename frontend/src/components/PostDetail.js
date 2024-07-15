// src/components/PostDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../services/postService";
import Modal from "./Modal";
import "../css/postdetail.css";
import SlideShow from "./SlideShow";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [initialSlideIndex, setInitialSlideIndex] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await fetchPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found</div>;

  const handleMediaClick = (index) => {
    setInitialSlideIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="file-container">
        {post.imageUrls.map((imageUrl, index) => (
          <div key={index} className="file-item" onClick={() => handleMediaClick(index)}>
            <img
              src={`http://localhost:5001${imageUrl}`}
              alt=""
            />
          </div>
        ))}
        {post.videoUrls.map((videoUrl, index) => (
          <div key={index + post.imageUrls.length} className="file-item" onClick={() => handleMediaClick(index + post.imageUrls.length)}>
            <video controls className="video">
              <source src={`http://localhost:5001${videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <SlideShow post={post} initialSlideIndex={initialSlideIndex} />
      </Modal>
    </div>
  );
};

export default PostDetail;

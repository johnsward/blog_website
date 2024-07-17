// src/components/SlideShow.js
import React, { useState, useEffect } from "react";
import "../css/slideshow.css";

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const SlideShow = ({ post, initialSlideIndex }) => {
  const [slideIndex, setSlideIndex] = useState(initialSlideIndex);

  useEffect(() => {
    setSlideIndex(initialSlideIndex);
  }, [initialSlideIndex]);

  // Combine imageUrls and videoUrls into a single array
  const mediaUrls = [...post.imageUrls, ...post.videoUrls];

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length);
  };

  const setCurrentSlide = (index) => {
    setSlideIndex(index);
  };

  if (!post) return <div>No post found</div>;

  return (
    <div className="slideshow-container">
      {mediaUrls.map((url, index) => (
        <div
          className={`slide-item ${index === slideIndex ? "active" : ""}`}
          key={index}
          style={{
            display: index === slideIndex ? "block" : "none",
          }}
        >
          {index < post.imageUrls.length ? (
            <img src={`${baseUrl}${url}`} alt={post.title} />
          ) : (
            <video controls>
              <source src={`${baseUrl}${url}`} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="dots">
        {mediaUrls.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideIndex ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;

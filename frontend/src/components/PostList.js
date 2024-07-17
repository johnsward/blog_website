import React, { useEffect, useState } from "react";
import { fetchPosts } from "../services/postService";
import { Link } from "react-router-dom";
import "../css/postlist.css";
import RightArrowIconIos from "@mui/icons-material/ArrowForwardIos";
import SubscribeForm from "./SubscribeForm";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const PostList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  const [sidePosts, setSidePosts] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        if (data.length > 0) {
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAllPosts(data);
          setLatestPost(data[0]);
          setSidePosts(data.slice(1, 3));
          setDisplayPosts(data.slice(3, 12)); // Initialize with the first 9 grid posts
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      let filteredPosts = allPosts.filter(
        (post) =>
          post._id !== latestPost?._id &&
          !sidePosts.some((p) => p._id === post._id)
      );

      if (selectedMonthYear) {
        filteredPosts = filteredPosts.filter(
          (post) => formatDate(post.date) === selectedMonthYear
        );
      }

      if (selectedCategory) {
        filteredPosts = filteredPosts.filter(
          (post) => post.label === selectedCategory
        );
      }

      setDisplayPosts(filteredPosts.slice(0, 9)); // Limit to 9 posts
    };

    filterPosts();
  }, [selectedMonthYear, selectedCategory, allPosts, latestPost, sidePosts]);

  const formatDate = (date) => {
    const options = { month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("default", options);
  };

  const handleMonthYearChange = (event) => {
    setSelectedMonthYear(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const monthYears = Array.from(
    new Set(allPosts.map((post) => formatDate(post.date)))
  ).sort();

  const categories = Array.from(
    new Set(allPosts.map((post) => post.label).filter(Boolean))
  );

  return (
    <div className="main">
      <div className="post-list-container">
        <div className="latest-post-container">
          {latestPost && (
            <div
              className="latest-post"
              style={{
                backgroundImage: `url(${baseUrl}${latestPost.imageUrls[0]})`,
              }}
            >
              <div className="latest-info-container">
                <div className="label-container">
                  {latestPost.label && (
                    <p className="post-label">{latestPost.label}</p>
                  )}
                </div>
                <div className="post-list-content">
                  <h2>{latestPost.title.toUpperCase()}</h2>
                  {latestPost.content && (
                    <p className="post-content">{latestPost.content}</p>
                  )}
                </div>
                <div className="latest-bottom-container">
                  {latestPost.date && (
                    <p className="post-date">{formatDate(latestPost.date)}</p>
                  )}
                  <Link
                    to={`/posts/${latestPost._id}`}
                    className="latest-read-more"
                  >
                    <p className="read-more-text">Läs mer</p>
                    <RightArrowIconIos className="right-icon" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="sideposts">
            {sidePosts.map((post) => (
              <div
                key={post._id}
                className="sidepost"
                style={{
                  backgroundImage: `url(${baseUrl}${post.imageUrls[0]})`,
                }}
              >
                <div className="sidepost-content">
                  {post.label && <p className="post-label">{post.label}</p>}
                  <h1>{post.title.toUpperCase()}</h1>
                  <div className="sidepost-bottom">
                    {post.date && (
                      <p className="post-date">{formatDate(post.date)}</p>
                    )}
                    <Link
                      to={`/posts/${post._id}`}
                      className="sidepost-read-more"
                    >
                      <p className="read-more-text">Läs mer</p>
                      <RightArrowIconIos className="right-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section2">
        <div className="filter-container">
          <div className="category-container">
            <ul>
              <li className={!selectedCategory ? "active" : ""} onClick={() => handleCategoryClick('')}>Alla</li>
              {categories.map((category) => (
                <li
                  key={category}
                  className={selectedCategory === category ? "active" : ""}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="sort-container">
            <label htmlFor="sort-select">Sortera efter datum:</label>
            <select id="sort-select" onChange={handleMonthYearChange}>
              <option value="">Senaste</option>
              {monthYears.map((monthYear) => (
                <option key={monthYear} value={monthYear}>
                  {monthYear}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="post-grid">
          {displayPosts.map((filteredPost) => (
            <div key={filteredPost._id} className="grid-post">
              <img
                src={`${baseUrl}${filteredPost.imageUrls[0]}`}
                alt={filteredPost.title}
                className="grid-image"
              />
              <div className="grid-info-container">
                <h4>{filteredPost.title.toUpperCase()}</h4>
                <div className="grid-bottom-container">
                  {filteredPost.date && (
                    <p className="post-date">
                      {formatDate(filteredPost.date)}{" | "}
                      {filteredPost.label && (
                        <span className="grid-post-label">
                        {" | "}{filteredPost.label}
                        </span>
                      )}
                    </p>
                  )}
                  <Link
                    to={`/posts/${filteredPost._id}`}
                    className="grid-read-more"
                  >
                    <p className="read-more-text">Läs mer</p>
                    <RightArrowIconIos className="right-icon" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="never-miss-container">
        <div className="never-miss">
          <div className="never-miss-content">
            <h2>MISSA MIG INTE</h2>
            <p>FÅ EN PLING NÄR JAG LÄGGER UPP NÅGOT</p>
          </div>
          <SubscribeForm />
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/posts">Blogg</a>
            <a href="/about">Om bloggen</a>
          </div>
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;

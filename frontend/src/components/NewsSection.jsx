import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import "bootstrap-icons/font/bootstrap-icons.css";



const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const CATEGORIES = ["general", "sports", "business", "entertainment", "politics", "health", "science", "technology"];

console.log("API Key:", API_KEY);

function NewsSection() {
  const [news, setNews] = useState({
    general: [],
    sports: [],
    business: [],
    entertainment: [],
    politics: [],
    health: [],
    science: [],
    technology: [],
  });

  const scrollRefs = useRef({});

  // Fetch API for each category
  const fetchNews = async (category) => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

    console.log("Fetching from URL:", apiUrl); // Debugging

    try {
      const response = await axios.get(apiUrl);
      setNews((prevNews) => ({
        ...prevNews,
        [category]: response.data.articles,
      }));
    } catch (error) {
      console.error(
        `Error fetching ${category} news:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  // Fetch news for all categories when component loads
  useEffect(() => {
    CATEGORIES.forEach((category) => fetchNews(category));
  }, []);

  // Scroll left/right function
  const scroll = (category, direction) => {
    const container = scrollRefs.current[category];
    if (container) {
      container.scrollLeft += direction * 300;
    }
  };

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || []; // ✅ Ensures `favorites` is always an array
  });


  // Toggle favorite articles
  const toggleFavorite = (article) => {
    let updatedFavorites;

    if (favorites.some((fav) => fav.url === article.url)) {
      updatedFavorites = favorites.filter((fav) => fav.url !== article.url); // Remove from favorites
    } else {
      updatedFavorites = [...favorites, article]; // Add to favorites
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
  };


    // Function to share the article
  const shareArticle = (article) => {
    const shareUrl = article.url;
    const title = article.title;

    if (navigator.share) {
      navigator.share({
        title: title,
        url: shareUrl,
      })
      .then(() => console.log("Thanks for sharing!"))
      .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(`${title} - ${shareUrl}`);
      alert("Link copied! You can manually share it on social media.");
    }
  };

  // Function to trim long text
const truncateText = (text, maxLength) => {
  if (!text) return ""; // Handle cases where text is missing
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};


  return (
    <Container className="news-section">
      {CATEGORIES.map((category) => (
        <div key={category} id={category} className="news-category">
          <h2>{category.toUpperCase()} NEWS</h2>

          <div className="scroll-wrapper">
            <button className="scroll-btn left" onClick={() => scroll(category, -1)}>
              <i className="bi bi-chevron-left"></i>
            </button>

            <div
              className="news-scroll-container"
              ref={(el) => (scrollRefs.current[category] = el)}
            >
              {news[category].map((article, index) => (

                <div key={index} className="news-card">
                  {/* Wrap Image and Share Icon Together */}
                  <div className="news-image-container">
                    <img src={article.urlToImage || "https://via.placeholder.com/300"} alt={article.title} />
                    {/* Share Button Icon Positioned on Image */}
                    <button className="share-icon" onClick={() => shareArticle(article)}>
                      <i className="bi bi-share-fill"></i>
                    </button>
                  </div>
                  <img
                    src={article.urlToImage || "https://via.placeholder.com/300"}
                    alt={article.title}/>

                   {/* News Content */}
                   <div className="news-content">
                    {/* ✅ Trimmed Title (Max 80 characters) */}
                    <h5>{truncateText(article.title, 80)}</h5>
                    
                    {/* ✅ Trimmed Description (Max 120 characters) */}
                    <p>{truncateText(article.description, 120)}</p>
                     {/* Favorite Button */}
                    <button
                      className={`favorite-btn ${favorites?.some((fav) => fav?.url === article?.url) ? "favorited" : ""}`}
                      onClick={() => toggleFavorite(article)}
                    >
                      {favorites?.some((fav) => fav?.url === article?.url) ? "❤️ Favorited" : "🤍 Favorite"}
                    </button>

                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button className="scroll-btn right" onClick={() => scroll(category, 1)}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default NewsSection;

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./NewsSection.css"; // Reuse existing CSS styles

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Remove an article from favorites
  const removeFavorite = (articleUrl) => {
    const updatedFavorites = favorites.filter((fav) => fav.url !== articleUrl);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container className="news-section">
      <h2 className="news-heading">Your Favorite Articles</h2>
      {favorites.length > 0 ? (
        <div className="news-scroll-container">
          {favorites.map((article, index) => (
            <div key={index} className="news-card">
              <img src={article.urlToImage || "https://via.placeholder.com/300"} alt={article.title} />
              <div className="news-content">
                <h5>{article.title}</h5>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More <i className="bi bi-arrow-right"></i>
                </a>
                <button className="favorite-btn" onClick={() => removeFavorite(article.url)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite articles saved yet!</p>
      )}
    </Container>
  );
}

export default Favorites;

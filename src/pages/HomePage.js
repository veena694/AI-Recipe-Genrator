import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  // Array of random food image URLs
  const foodImages = [
    "https://images.indianexpress.com/2024/03/processed-food.jpg",
    "https://images.squarespace-cdn.com/content/v1/578753d7d482e9c3a909de40/1716723686939-PL6TLRAF3SJU8ISSCLEV/We+Idliwale+Barroom+%286%29.jpg?format=1500w",
    "https://fitandflex.in/cdn/shop/articles/istockphoto-1127563435-612x612_1445x.jpg?v=1720790357",
    "https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to navigate to recipes page
  const handleSearchRecipes = () => {
    navigate("/recipes");
  };

  // Change image every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % foodImages.length);
    }, 10000); // 10000ms = 10 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [foodImages.length]);

  return (
    <div className="home-container">
      <div className="content">
        <h1>AI-Powered Recipe Generator</h1>
        <button className="search-button" onClick={handleSearchRecipes}>
          Search Recipes
        </button>
      </div>
      <div className="image-section">
        <img
          src={foodImages[currentImageIndex]}
          alt="Delicious food"
          className="food-image"
        />
      </div>
    </div>
  );
}

export default HomePage;

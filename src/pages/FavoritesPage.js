import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FavoritesPage.css";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe-details/${recipe.id}`, { state: { recipe } });
  };

  const handleRemoveFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h2>Favourite Recipes ❤️</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet. Add some from the suggestions!</p>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.image}
                alt={recipe.title}
                onClick={() => handleRecipeClick(recipe)} 
              />
              <div
                className="favorite-heart"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleRemoveFromFavorites(recipe.id);
                }}
              >
                ❤️
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;

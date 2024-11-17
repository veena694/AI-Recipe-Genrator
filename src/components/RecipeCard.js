import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RecipeCard.css";

function RecipeCard({ recipe, isFavorite, onToggleFavorite}) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/recipe-details/${recipe.id}`);
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <button className="search-button" onClick={handleViewDetails}>
        <p>{recipe.description}</p>
        Search
      </button>
      <button
        className={isFavorite ? "remove-favorite-button" : "add-favorite-button"}
        onClick={onToggleFavorite}
      >
        {isFavorite ? "Remove from Favorites" : "❤️"}
      </button>
    </div>
  );
}

export default RecipeCard;



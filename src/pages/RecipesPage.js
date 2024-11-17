import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import "../styles/RecipesPage.css";

function RecipesPage() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomRecipes();
    loadFavorites();
  }, []);

  const fetchRandomRecipes = async () => {
    const apiKey = "8947aeb90a7448dcabd53a297bdb21b0";
    const url = `https://api.spoonacular.com/recipes/random?number=99&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.recipes);
    } catch (error) {
      console.error("Error fetching random recipes:", error);
    }
  };

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.id === recipe.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() && !ingredients.includes(ingredientInput)) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleSearchRecipes = () => {
    if (ingredients.length === 0) {
      alert("Please add some ingredients before searching.");
      return;
    }
    navigate("/search-results", { state: { ingredients } });
  };

  const handleViewFavorites = () => {
    navigate("/favorites"); // Navigate to FavoritesPage
  };

  return (
    <div className="recipes-page">
      <h2>Search Recipes</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Add an ingredient"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        />
        <button onClick={handleAddIngredient}>Add</button>
      </div>
      <div className="ingredient-tags">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-tag">
            {ingredient}
            <button onClick={() => handleRemoveIngredient(ingredient)}>×</button>
          </div>
        ))}
      </div>
      <button className="search-recipes-button" onClick={handleSearchRecipes}>
        Search Recipes
      </button>
      <button className="view-favorites-button" onClick={handleViewFavorites}>
        ❤️
      </button>
      <h3>Suggestions</h3>
      <div className="recipe-grid">
        {suggestions.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.some((fav) => fav.id === recipe.id)}
            onToggleFavorite={() => toggleFavorite(recipe)}
          />
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;

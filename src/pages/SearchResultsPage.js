import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/SearchResultssPage.css";

const API_BASE_URL = 'https://api.spoonacular.com/recipes/findByIngredients';
const API_KEY = '8947aeb90a7448dcabd53a297bdb21b0'; // Replace with your actual Spoonacular API key

function SearchResultsPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const ingredients = location.state?.ingredients || [];

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const fetchRecipesByIngredients = useCallback(async () => {
        if (ingredients.length === 0) return;

        setLoading(true);
        setError(null);
        const ingredientQuery = ingredients.join(',');

        try {
            const response = await fetch(
                `${API_BASE_URL}?ingredients=${ingredientQuery}&apiKey=${API_KEY}`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                setRecipes(data);
            } else {
                await fetchRandomRecipes();
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
            setError("Error fetching recipes. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [ingredients]);

    const fetchRandomRecipes = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`
            );
            const data = await response.json();
            setRecipes(data.recipes || []);
        } catch (error) {
            console.error("Error fetching random recipes:", error);
            setError("Error fetching random recipes. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ingredients.length > 0) {
            fetchRecipesByIngredients();
        } else {
            fetchRandomRecipes();
        }
    }, [fetchRecipesByIngredients, ingredients.length]);

    const toggleFavorite = (recipe) => {
        const isFavorite = favorites.some(fav => fav.id === recipe.id);
        const updatedFavorites = isFavorite
            ? favorites.filter(fav => fav.id !== recipe.id)
            : [...favorites, recipe];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const viewRecipeDetails = (recipe) => {
        navigate(`/recipe-details/${recipe.id}`, { state: { recipe } });
    };

    if (loading) {
        return <p>Loading recipes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="search-results-page">
            <h2>Ingredients</h2>
            <div className="ingredients">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-tag">{ingredient}</div>
                ))}
            </div>

            <h2>Recipes</h2>
            {recipes && recipes.length > 0 ? (
                <div className="recipe-list">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} />
                            <button 
                                onClick={() => viewRecipeDetails(recipe)}
                                className="search-button"
                            >
                                Search
                            </button>
                            <button 
                                onClick={() => toggleFavorite(recipe)}
                                className={
                                    favorites.some(fav => fav.id === recipe.id)
                                        ? 'remove-favorite-button'
                                        : 'add-favorite-button'
                                }
                            >
                                {favorites.some(fav => fav.id === recipe.id)
                                    ? 'Remove'
                                    : '❤️'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found. Showing random recipes instead.</p>
            )}
        </div>
    );
}

export default SearchResultsPage;

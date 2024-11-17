import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/RecipeDetailsPage.css";

function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    const apiKey = "8947aeb90a7448dcabd53a297bdb21b0";
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipeDetails(data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  if (!recipeDetails) {
    return <p>Loading recipe details...</p>;
  }

  return (
    <div className="recipe-details-page">
      <h2>{recipeDetails.title}</h2>
      <img src={recipeDetails.image} alt={recipeDetails.title} />
      <h3>Ingredients:</h3>
      <ul>
        {recipeDetails.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipeDetails.instructions}</p>
    </div>
  );
}

export default RecipeDetailsPage;

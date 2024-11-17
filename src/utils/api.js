import axios from "axios";

export const getRecipes = async (ingredients) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}`,
      {
        params: {
          ingredients: ingredients.join(","),
          apiKey: process.env.REACT_APP_API_KEY,
          number: 10,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

// New function to fetch detailed recipe information by ID
export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: process.env.REACT_APP_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};

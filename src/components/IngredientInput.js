import React, { useState } from "react";
import "../styles/IngredientInput.css";

function IngredientInput({ ingredients, setIngredients }) {
  const [ingredientInput, setIngredientInput] = useState("");

  const handleAddIngredient = () => {
    if (ingredientInput) {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  return (
    <div className="ingredient-input">
      <input
        type="text"
        placeholder="Add an ingredient"
        value={ingredientInput}
        onChange={(e) => setIngredientInput(e.target.value)}
      />
      <button onClick={handleAddIngredient}>Add</button>
    </div>
  );
}

export default IngredientInput;

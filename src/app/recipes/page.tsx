"use client";

import AddIngredientForm from "@/components/dataForms/addIngredientForm/addIngredientForm";
import React, { useEffect, useState } from "react";
import RecipeInfo from "@/components/recipeInfo/recipeInfo";
import AddRecipeForm from "@/components/dataForms/addRecipeForm/addRecipeForm";

function RecipesPage() {
  const [recipeList, setRecipeList] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  if (loading) {
    return <h1>Loading</h1>;
  } else if (showAddForm) {
    return <AddRecipeForm setShowAddForm={setShowAddForm} isForm={true} />;
  } else {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Recipes</h1>
        <div className="flex gap-4  mb-4">
          <button
            className="bg-mainGreen text-white p-2 px-4 rounded-md font-semibold text-lg"
            onClick={() => setShowAddForm(true)}
          >
            Add Recipe
          </button>
          <button>Filter</button>
          <button>Sort</button>
        </div>
        {Object.keys(recipeList).map((recipeID) => {
          const recipe = recipeList[recipeID];
          return <RecipeInfo key={recipe.id} recipe={recipe} />;
        })}
      </div>
    );
  }
}

export default RecipesPage;

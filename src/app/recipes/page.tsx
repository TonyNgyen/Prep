"use client";

import AddIngredientForm from "@/components/dataForms/addIngredientForm/addIngredientForm";
import React, { useEffect, useState } from "react";
import { getIngredients, getRecipes } from "@/lib/data";
import RecipeInfo from "@/components/recipeInfo/recipeInfo";
import AddRecipeForm from "@/components/dataForms/addRecipeForm/addRecipeForm";

type Nutrition = {
  [key: string]: number;
};

type Ingredient = {
  id: string;
  name: string;
  nutrition: Nutrition;
  servingSize?: number;
  servingUnit?: string;
  servingsPerContainer?: number;
  pricePerContainer?: number;
  howManyTimesUsed?: number;
  createdAt: Date;
};

type IngredientsList = {
  [key: string]: Ingredient;
};

type Recipe = {
  id: string;
  name: string;
  nutrition: Nutrition;
  ingredientsList: IngredientsList
  howManyServings: number;
  pricePerServing?: number;
  howManyTimesUsed?: number;
};

type RecipeList = {
  [key: string]: Recipe;
}

function RecipesPage() {
  const [recipeList, setRecipeList] = useState<RecipeList>({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!currentUser) {
        return;
      }
      try {
        setLoading(true);
        if (!currentUser) {
          console.warn("No user is logged in");
          setLoading(false);
          return;
        }

        const data = await getRecipes(currentUser.uid);

        if (!data) {
          setRecipeList({});
          setLoading(false);
          return;
        }

        const formattedData: RecipeList = data.reduce(
          (acc, recipe) => {
            acc[recipe.id] = recipe;
            return acc;
          },
          {} as RecipeList
        );

        setRecipeList(formattedData);
      } catch (error) {
        console.error("Failed to load ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentUser]);

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

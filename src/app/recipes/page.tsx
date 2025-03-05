"use client";

import AddIngredientForm from "@/components/dataForms/addIngredientForm/addIngredientForm";
import React, { useEffect, useState } from "react";
import RecipeInfo from "@/components/recipeInfo/displayRecipeInfo/recipeInfo";
import AddRecipeForm from "@/components/dataForms/addRecipeForm/addRecipeForm";
import { createClient } from "@/utils/supabase/client";

function RecipesPage() {
  const [recipeIdList, setRecipeIdList] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const supabase = createClient();
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        // console.log("8");

        if (userError) {
          console.error("Error fetching user:", userError);
          return;
        }
        // console.log("2");

        const userId = userData?.user?.id;

        const { data: fetchUserData, error: fetchUserError } = await supabase
          .from("users")
          .select()
          .eq("uid", userId);
        if (fetchUserError || !fetchUserData || fetchUserData.length === 0) {
          console.error("Error fetching user data:", fetchUserError);
          return;
        }
        // console.log("3");

        const recipeIdList = fetchUserData[0].recipes;
        const { data: fetchRecipeData, error: fetchRecipeError } =
          await supabase.from("recipes").select().in("id", recipeIdList);

        if (fetchRecipeError || !fetchRecipeData) {
          console.error("Error fetching recipes:", fetchRecipeError);
          return;
        }
        //console.log("4");

        setRecipeIdList(fetchRecipeData);
        setLoading(false);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    fetchRecipes();
  }, []);

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
        {/* {Object.keys(recipeList).map((recipeID) => {
          const recipe = recipeList[recipeID];
          return <RecipeInfo key={recipe.id} recipe={recipe} />;
        })} */}
      </div>
    );
  }
}

export default RecipesPage;

import React, { useState } from "react";
import { searchIngredient, searchRecipe } from "@/lib/data";
import {
  Ingredient,
  InventoryIngredient,
  InventoryRecipe,
  Recipe,
} from "@/types";

const NUTRITIONAL_KEYS = {
  calories: "Calories",
  protein: "Protein",
  totalFat: "Total Fat",
  saturatedFat: "Saturated Fat",
  polyunsaturatedFat: "Polyunsaturated Fat",
  monounsaturatedFat: "Monounsaturated Fat",
  transFat: "Trans Fat",
  cholesterol: "Cholesterol",
  sodium: "Sodium",
  potassium: "Potassium",
  totalCarbohydrates: "Total Carbohydrates",
  sugars: "Sugars",
  addedSugars: "Added Sugars",
  sugarAlcohols: "Sugar Alcohols",
  vitaminA: "Vitamin A",
  vitaminC: "Vitamin C",
  vitaminD: "Vitamin D",
  calcium: "Calcium",
  iron: "Iron",
};

const NUTRITIONAL_UNITS: Record<string, string> = {
  calories: "kcal",
  protein: "g",
  totalFat: "g",
  saturatedFat: "g",
  polyunsaturatedFat: "g",
  monounsaturatedFat: "g",
  transFat: "g",
  cholesterol: "mg",
  sodium: "mg",
  potassium: "mg",
  totalCarbohydrates: "g",
  sugars: "g",
  addedSugars: "g",
  sugarAlcohols: "g",
  vitaminA: "%",
  vitaminC: "%",
  vitaminD: "%",
  calcium: "%",
  iron: "%",
};

type SearchResultType = {
  recipes: Recipe[];
  ingredients: Ingredient[];
};

function Page1() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultType>({
    recipes: [],
    ingredients: [],
  });
  const searchItem = async () => {
    let ingredientData: Ingredient[] = [];
    let recipeData: Recipe[] = [];

    ingredientData = (await searchIngredient(search)) ?? [];
    recipeData = (await searchRecipe(search)) ?? [];

    setSearchResult({
      recipes: recipeData,
      ingredients: ingredientData,
    });
  };
  return (
    <div>
      <div>
        <label className="block font-semibold text-2xl">Food Name</label>
        <input
          type="text"
          placeholder="Lettuce"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md w-full p-2 border-gray-300"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        {searchResult.ingredients.map((ingredient) => (
          <InventoryIngredientInfo
            key={ingredient.id}
            ingredient={ingredient}
            add={addIngredient}
          />
        ))}
        {searchResult.recipes.map((recipe) => (
          <InventoryRecipeInfo
            add={addRecipe}
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
}

export default Page1;

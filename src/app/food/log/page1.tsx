import React, { useState } from "react";
import { fetchInventory, searchIngredient, searchRecipe } from "@/lib/data";
import {
  Ingredient,
  Recipe,
} from "@/types";
import LogIngredientInfo from "@/components/ingredientInfo/logIngredientInfo";
import LogRecipeInfo from "@/components/recipeInfo/logRecipeInfo";

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

type PageProps = {
  addLogIngredient: (
    id: string,
    name: string,
    containers: number,
    servingSize: number,
    numberOfServings: number,
    totalAmount: number,
    unit: string,
    type: string
  ) => void;
  addLogRecipe: (
    id: string,
    name: string,
    servings: number,
    servingSize: number,
    totalAmount: number,
    unit: string,
    type: string
  ) => void;
};

function Page1({ addLogIngredient, addLogRecipe }: PageProps) {
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

  const addIngredient = (
    id: string,
    name: string,
    containers: number,
    servingSize: number,
    numberOfServings: number,
    totalAmount: number,
    unit: string
  ) => {
    addLogIngredient(
      id,
      name,
      containers,
      servingSize,
      numberOfServings,
      totalAmount,
      unit,
      "ingredient"
    );
    setSearch("");
    setSearchResult({
      recipes: [],
      ingredients: [],
    });
  };

  const addRecipe = (
    id: string,
    name: string,
    servings: number,
    servingSize: number,
    totalAmount: number,
    unit: string
  ) => {
    addLogRecipe(id, name, servings, servingSize, totalAmount, unit, "recipe");
    setSearch("");
    setSearchResult({
      recipes: [],
      ingredients: [],
    });
  };

  return (
    <div>
      <div>
        <label className="block font-semibold text-2xl">Food Name</label>
        <button type="button" onClick={() => fetchInventory()}>
          Inventory
        </button>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Lettuce"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchItem();
              }
            }}
            className="border rounded-md w-full p-2 border-gray-300"
            required
          />
          <button
            type="button"
            className="bg-mainGreen px-3 text-white font-semibold"
            onClick={searchItem}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {searchResult.ingredients.map((ingredient) => (
          <LogIngredientInfo
            key={ingredient.id}
            ingredient={ingredient}
            add={addIngredient}
          />
        ))}
        {searchResult.recipes.map((recipe) => (
          <LogRecipeInfo add={addRecipe} key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Page1;

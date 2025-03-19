import InventoryIngredientInfo from "@/components/ingredientInfo/addInventoryIngredientInfo";
import InventoryRecipeInfo from "@/components/recipeInfo/addInventoryRecipeInfo";
import { searchIngredientByName, searchRecipeByName } from "@/lib/data";
import { Ingredient, Recipe } from "@/types";
import React, { useState } from "react";

type PageProps = {
  addInventoryIngredient: (
    id: string,
    name: string,
    containers: number,
    servingSize: number,
    numberOfServings: number,
    totalAmount: number,
    unit: string,
    type: string
  ) => void;
  addInventoryRecipe: (
    id: string,
    name: string,
    servings: number,
    servingSize: number,
    totalAmount: number,
    unit: string,
    type: string
  ) => void;
};

type SearchResultType = {
  recipes: Recipe[];
  ingredients: Ingredient[];
};

function Page1({ addInventoryIngredient, addInventoryRecipe }: PageProps) {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultType>({
    recipes: [],
    ingredients: [],
  });

  const searchItem = async () => {
    let ingredientData: Ingredient[] = [];
    let recipeData: Recipe[] = [];

    ingredientData = (await searchIngredientByName(search)) ?? [];
    recipeData = (await searchRecipeByName(search)) ?? [];

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
    addInventoryIngredient(
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
    addInventoryRecipe(
      id,
      name,
      servings,
      servingSize,
      totalAmount,
      unit,
      "recipe"
    );
    setSearch("");
    setSearchResult({
      recipes: [],
      ingredients: [],
    });
  };

  return (
    <div>
      <label className="block font-semibold mb-1">Item Name</label>
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
      <div>
        <div>
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
      </div>
    </div>
  );
}

export default Page1;

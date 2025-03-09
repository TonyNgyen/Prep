import InventoryIngredientInfo from "@/components/ingredientInfo/inventoryIngredientInfo";
import InventoryRecipeInfo from "@/components/recipeInfo/inventoryRecipeInfo";
import { searchIngredient, searchRecipe } from "@/lib/data";
import { Ingredient, Recipe } from "@/types";
import React, { useState } from "react";

type PageProps = {
  addInventoryItem: (
    id: string,
    name: string,
    servingSize: number,
    amountOfServings: number,
    totalAmount: number
  ) => void;
};

type SearchResultType = {
  recipes: Recipe[];
  ingredients: Ingredient[];
};

function Page1({ addInventoryItem }: PageProps) {
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

  const add = (
    id: string,
    name: string,
    servingSize: number,
    amountOfServings: number,
    totalAmount: number
  ) => {
    addInventoryItem(id, name, servingSize, amountOfServings, totalAmount);
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
                add={add}
              />
            ))}
            {searchResult.recipes.map((recipe) => (
              <InventoryRecipeInfo add={add} key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page1;

import InventoryIngredientInfo from "@/components/ingredientInfo/addInventoryIngredientInfo";
import InventoryRecipeInfo from "@/components/recipeInfo/addInventoryRecipeInfo";
import { searchIngredient, searchRecipe } from "@/lib/data";
import { Ingredient, Recipe } from "@/types";
import React, { useState } from "react";

type PageProps = {
  addType: string | null;
  addInventoryIngredient: (
    id: string,
    name: string,
    servingSize: number,
    numberOfServings: number,
    totalAmount: number
  ) => void;
};

function Page3({ addType, addInventoryIngredient }: PageProps) {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Recipe[] | Ingredient[]>([]);
  const searchItem = async () => {
    let data;
    if (addType == "ingredient") {
      data = await searchIngredient(search);
    } else {
      data = await searchRecipe(search);
    }
    setSearchResult(data ?? []);
  };

  const add = (
    id: string,
    name: string,
    servingSize: number,
    numberOfServings: number,
    totalAmount: number
  ) => {
    addInventoryIngredient(id, name, servingSize, numberOfServings, totalAmount);
    setSearch("");
    setSearchResult([]);
  };

  return (
    <div>
      <div className="flex">
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
          {addType === "ingredient"
            ? searchResult.map((result) => (
                <InventoryIngredientInfo
                  key={(result as Ingredient).id}
                  ingredient={result as Ingredient}
                  add={add}
                />
              ))
            : searchResult.map((result) => (
                <InventoryRecipeInfo
                  key={(result as Recipe).id}
                  recipe={result as Recipe}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Page3;

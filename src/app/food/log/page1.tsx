import React, { useState } from "react";
import { fetchInventory, searchIngredient, searchRecipe } from "@/lib/data";
import {
  Ingredient,
  InventoryIngredient,
  InventoryRecipe,
  NutritionFacts,
  Recipe,
} from "@/types";
import LogIngredientInfo from "@/components/ingredientInfo/logIngredientInfo";
import LogRecipeInfo from "@/components/recipeInfo/logRecipeInfo";
import Dropdown from "@/components/dropdown/dropdown";

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

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

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
  nutrition: NutritionFacts;
  setNutrition: React.Dispatch<React.SetStateAction<NutritionFacts>>;
  inventory: ItemsToAdd;
  setInventory: React.Dispatch<React.SetStateAction<ItemsToAdd>>;
  meal: string;
  setMeal: React.Dispatch<React.SetStateAction<string>>;
};

function Page1({
  addLogIngredient,
  addLogRecipe,
  nutrition,
  setNutrition,
  inventory,
  setInventory,
  meal,
  setMeal,
}: PageProps) {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultType>({
    recipes: [],
    ingredients: [],
  });

  const options = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Snack" },
    { value: "misc", label: "Miscellaneous" },
  ];

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

  const handleDropdownChange = (selectedValue: string) => {
    setMeal(selectedValue);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold text-2xl">Meal</label>
        <Dropdown
          options={options}
          className="rounded-md"
          onChange={handleDropdownChange}
          defaultValue="Select a meal"
        />
      </div>
      <div>
        <label className="block font-semibold text-2xl">Food Name</label>
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

        {/* <div className="bg-orange-200 h-96"></div> */}
      </div>
      <div className="flex flex-col gap-2">
        {searchResult.ingredients.map((ingredient) => (
          <LogIngredientInfo
            key={ingredient.id}
            ingredient={ingredient}
            add={addIngredient}
            inventory={inventory}
            setInventory={setInventory}
            setNutrition={setNutrition}
            nutrition={nutrition}
          />
        ))}
        {searchResult.recipes.map((recipe) => (
          <LogRecipeInfo
            add={addRecipe}
            key={recipe.id}
            recipe={recipe}
            inventory={inventory}
            setInventory={setInventory}
            setNutrition={setNutrition}
            nutrition={nutrition}
          />
        ))}
      </div>
    </div>
  );
}

export default Page1;

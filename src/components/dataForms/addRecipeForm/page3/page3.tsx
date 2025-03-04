import React from "react";
import { Ingredient, NutritionFacts } from "@/types";
import AddRecipeInfo from "@/components/recipeInfo/addRecipeInfo/addRecipeInfo";

type formProp = {
  ingredientList: Record<
    string,
    {
      ingredient: Ingredient;
      numberOfServings: number;
      servingSize: number | null;
    }
  >;
  setIngredientList: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          ingredient: Ingredient;
          numberOfServings: number;
          servingSize: number | null;
        }
      >
    >
  >;
  ingredientIdList: Object;
  setIngredientIdList: React.Dispatch<Object>;
  recipeNutrition: NutritionFacts;
  name: string;
  totalServingSize: number;
};

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
} as const;

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

function Page3({
  ingredientList,
  setIngredientList,
  ingredientIdList,
  setIngredientIdList,
  recipeNutrition,
  name,
  totalServingSize,
}: formProp) {
  return (
    <form className="space-y-3 flex-1">
      <h1 className="text-3xl font-bold text-center h-10">{name}</h1>
      {/* <div className="flex gap-4">
        <button
          className="bg-mainGreen text-white p-4 rounded-md"
          type="button"
          onClick={() => console.log(ingredientList)}
        >
          Ingredient List
        </button>
        <button
          className="bg-mainGreen text-white p-4 rounded-md"
          type="button"
          onClick={() => console.log(ingredientIdList)}
        >
          Ingredient ID List
        </button>
        <button
          className="bg-mainGreen text-white p-4 rounded-md"
          type="button"
          onClick={() => console.log(recipeNutrition)}
        >
          Recipe Nutrition
        </button>
      </div> */}
      <div className="border-mainGreen border-[3px] p-3 rounded-md">
        <div className="space-y-2">
          {(
            Object.keys(NUTRITIONAL_KEYS) as Array<
              keyof typeof NUTRITIONAL_KEYS
            >
          ).map((key) => {
            const value = recipeNutrition[key];
            if (value === null || value === undefined) return null; // Skip null/undefined values

            const unit = NUTRITIONAL_UNITS[key]; // Get the unit for the current key
            return (
              <div
                key={key}
                className="flex items-center justify-between text-lg"
              >
                <span>{NUTRITIONAL_KEYS[key]}</span>
                <span>
                  {value}
                  {unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}

export default Page3;

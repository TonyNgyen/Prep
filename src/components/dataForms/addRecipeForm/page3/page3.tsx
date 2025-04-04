import React, { useState } from "react";
import { Ingredient, NutritionFacts } from "@/types";

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
  numberOfServings: number;
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
  numberOfServings,
}: formProp) {
  const [displayTotal, setDisplayTotal] = useState<boolean>(true);
  return (
    <form className="space-y-3 flex-1">
      <div className="flex bg-mainGreen w-10/12 mx-auto h-12 rounded-md border-mainGreen border-[4px]">
        <button
          className={`h-full w-1/2 rounded-l-md font-bold tracking-wide ${
            displayTotal ? "bg-white text-mainGreen" : " text-white"
          }`}
          type="button"
          onClick={() => setDisplayTotal(true)}
        >
          Total Recipe
        </button>
        <button
          className={`h-full w-1/2 rounded-r-md font-bold tracking-wide ${
            !displayTotal ? "bg-white text-mainGreen" : " text-white"
          }`}
          type="button"
          onClick={() => setDisplayTotal(false)}
        >
          Per Serving
        </button>
      </div>
      <div className="border-mainGreen border-[3px] p-3 rounded-md">
        <div className="space-y-2">
          {(
            Object.keys(NUTRITIONAL_KEYS) as Array<
              keyof typeof NUTRITIONAL_KEYS
            >
          ).map((key) => {
            let value;
            if (displayTotal) {
              value = Number(recipeNutrition[key].toFixed(2));
            } else {
              value = Number(
                (recipeNutrition[key] / numberOfServings).toFixed(2)
              );
            }

            if (value === null || value === undefined) return null;

            const unit = NUTRITIONAL_UNITS[key];
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
          {Object.keys(recipeNutrition.extraNutrition).map((key) => {
            let value;
            if (displayTotal) {
              value = Number(
                recipeNutrition.extraNutrition[key].value.toFixed(2)
              );
            } else {
              value = Number(
                (
                  recipeNutrition.extraNutrition[key].value / numberOfServings
                ).toFixed(2)
              );
            }

            if (value === null || value === undefined) return null;

            let unit;
            if (recipeNutrition.extraNutrition[key].unit == "percent") {
              unit = "%";
            } else {
              unit = recipeNutrition.extraNutrition[key].unit;
            }

            return (
              <div
                key={key}
                className="flex items-center justify-between text-lg"
              >
                <span>{recipeNutrition.extraNutrition[key].label}</span>
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

import React, { useState } from "react";
import { Ingredient, NutritionFacts } from "@/types";
import { NUTRITIONAL_KEYS } from "@/constants/NUTRITIONAL_KEYS";
import { NUTRITIONAL_UNITS } from "@/constants/NUTRITIONAL_UNITS";

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
            let value = recipeNutrition[key];

            if (value === null || value === undefined) return null;

            if (displayTotal) {
              value = Number(value.toFixed(2));
            } else {
              value = Number((value / numberOfServings).toFixed(2));
            }

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
            let value = recipeNutrition.extraNutrition[key]?.value;

            if (value === null || value === undefined) return null;

            if (displayTotal) {
              value = Number(value.toFixed(2));
            } else {
              value = Number((value / numberOfServings).toFixed(2));
            }

            let unit;
            if (recipeNutrition.extraNutrition[key]?.unit === "percent") {
              unit = "%";
            } else {
              unit = recipeNutrition.extraNutrition[key]?.unit;
            }

            return (
              <div
                key={key}
                className="flex items-center justify-between text-lg"
              >
                <span>{recipeNutrition.extraNutrition[key]?.label}</span>
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

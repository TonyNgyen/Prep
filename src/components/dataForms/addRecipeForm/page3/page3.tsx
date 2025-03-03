import React from "react";
import { Ingredient } from "@/types";

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
  recipeNutrition: Omit<
    Ingredient,
    | "id"
    | "name"
    | "servingSize"
    | "servingUnit"
    | "servingsPerContainer"
    | "pricePerContainer"
  >;
};

function Page3({
  ingredientList,
  setIngredientList,
  ingredientIdList,
  setIngredientIdList,
  recipeNutrition,
}: formProp) {
  return (
    <form className="space-y-3 flex-1">
      <h1>Page 3</h1>
      <div className="flex gap-4">
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
      </div>
    </form>
  );
}

export default Page3;

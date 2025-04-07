import { IngredientMeal, RecipeMeal } from "@/types";
import React from "react";

type SpecificFoodProps = {
  food: IngredientMeal | RecipeMeal;
};

function SpecificFood({ food }: SpecificFoodProps) {
  const isCustomServing = food.unit === "x";
  const unitLabel = isCustomServing
    ? food.totalAmount > 1
      ? " Servings"
      : " Serving"
    : food.unit;

  return (
    <div className="flex flex-col">
      <h2 className="text-md font-medium">{food.name}</h2>
      <h3 className="text-sm text-gray-600">
        {food.totalAmount}
        {unitLabel && `${unitLabel}`}
      </h3>
    </div>
  );
}

export default SpecificFood;

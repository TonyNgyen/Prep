import { IngredientMeal, RecipeMeal } from "@/types";
import React from "react";

type SpecificFoodProps = {
  food: IngredientMeal | RecipeMeal;
};

function SpecificFood({ food }: SpecificFoodProps) {
  return (
    <div className="flex justify-between">
      <h2 className="text-md">{food.name}</h2>
      <h3 className="text-sm">
        {food.totalAmount}
        {food.unit}
      </h3>
    </div>
  );
}

export default SpecificFood;

"use state";

import { IngredientMeal, RecipeMeal } from "@/types";
import React, { useState } from "react";

type EditSpecificFoodProps = {
  food: IngredientMeal | RecipeMeal;
};

function EditSpecificFood({ food }: EditSpecificFoodProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-md">{food.name}</h2>
        <h3 className="text-sm">
          {food.totalAmount}
          {food.unit}
        </h3>
      </div>
    </div>
  );
}

export default EditSpecificFood;

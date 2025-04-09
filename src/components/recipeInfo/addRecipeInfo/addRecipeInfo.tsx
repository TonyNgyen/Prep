import { NUTRITIONAL_KEYS } from "@/constants/NUTRITIONAL_KEYS";
import { NUTRITIONAL_UNITS } from "@/constants/NUTRITIONAL_UNITS";
import { NutritionFacts } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type AddRecipeInfoProps = {
  name: string;
  nutritionFacts: NutritionFacts;
  totalServingSize: number;
};

function AddRecipeInfo({
  name,
  nutritionFacts,
  totalServingSize,
}: AddRecipeInfoProps) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="space-y-2">
      {(
        Object.keys(NUTRITIONAL_KEYS) as Array<keyof typeof NUTRITIONAL_KEYS>
      ).map((key) => {
        const value = nutritionFacts[key];
        if (value === null || value === undefined) return null;

        const unit = NUTRITIONAL_UNITS[key];
        return (
          <div key={key} className="flex items-center justify-between text-lg">
            <span>{NUTRITIONAL_KEYS[key]}</span>
            <span>
              {value}
              {unit}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default AddRecipeInfo;

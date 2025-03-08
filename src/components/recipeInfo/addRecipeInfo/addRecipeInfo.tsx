import { NutritionFacts } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

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
        if (value === null || value === undefined) return null; // Skip null/undefined values

        const unit = NUTRITIONAL_UNITS[key]; // Get the unit for the current key
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

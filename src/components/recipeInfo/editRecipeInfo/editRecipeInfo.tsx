import { Recipe } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type EditRecipeInfoProps = {
  recipe: Recipe;
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

function EditRecipeInfo({ recipe }: EditRecipeInfoProps) {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="shadow-md">
      <div
        className={`bg-mainGreen text-white p-3 rounded-md flex items-center justify-between ${
          dropdown && "rounded-b-none"
        }`}
      >
        <h1 className="text-2xl font-semibold">{recipe.name}</h1>

        {dropdown ? (
          <IoMdArrowDropup
            className="text-4xl"
            onClick={() => setDropdown(false)}
          />
        ) : (
          <IoMdArrowDropdown
            className="text-4xl"
            onClick={() => setDropdown(true)}
          />
        )}
      </div>
      {dropdown && (
        <div className="bg-white rounded-b-md p-3 max-h-96 overflow-y-auto border-mainGreen border-[3px] border-t-0">
          <div className="border-b-8 border-b-mainGreen pb-2 mb-2">
            <div>
              <h1 className="text-lg">
                {recipe.numberOfServings} Servings Per Recipe
              </h1>
            </div>
            {/* <div className="flex items-center justify-between text-2xl font-bold">
              <h1>Serving Size</h1>
              <p>
                {ingredient.servingSize}
                {ingredient.servingUnit ? ingredient.servingUnit : "g"}
              </p>
            </div> */}
          </div>

          {/* Display Nutritional Facts */}
          <div className="space-y-2">
            {(
              Object.keys(NUTRITIONAL_KEYS) as Array<
                keyof typeof NUTRITIONAL_KEYS
              >
            ).map((key) => {
              const value = recipe[key];
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

            {Object.keys(recipe.extraNutrition ?? {}).map((key) => {
              if (!recipe.extraNutrition?.[key]) return null;

              const value = recipe.extraNutrition[key].value;

              if (value === null || value === undefined) return null;

              let unit;
              if (recipe.extraNutrition[key].unit == "percent") {
                unit = "%";
              } else {
                unit = recipe.extraNutrition[key].unit;
              }

              return (
                <div
                  key={key}
                  className="flex items-center justify-between text-lg"
                >
                  <span>{recipe.extraNutrition[key].label}</span>
                  <span>
                    {value}
                    {unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditRecipeInfo;

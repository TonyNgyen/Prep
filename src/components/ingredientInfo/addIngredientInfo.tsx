"use client";

import { Ingredient } from "@/types";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type AddIngredientInfoProps = {
  ingredient: Ingredient;
  addIngredient: (
    index: number,
    numberOfservings: number,
    servingSize: number | null
  ) => void;
  setAddingIngredient: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
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

function AddIngredientInfo({
  ingredient,
  addIngredient,
  setAddingIngredient,
  index,
}: AddIngredientInfoProps) {
  const [dropdown, setDropdown] = useState(false);
  const [servingSize, setServingSize] = useState(ingredient.servingSize);
  const [numberOfServings, setNumberOfServings] = useState(1);

  useEffect(() => {
    setServingSize(ingredient.servingSize);
    setNumberOfServings(1);
  }, [ingredient]);

  return (
    <div className="shadow-md">
      <div
        className={`bg-mainGreen text-white p-3 rounded-md flex items-center justify-between ${
          dropdown && "rounded-b-none"
        }`}
      >
        <div className="flex gap-3">
          <button
            type="button"
            className="bg-white text-mainGreen px-2 rounded-md text-lg font-semibold"
            onClick={() => {
              addIngredient(index, numberOfServings, servingSize);
              setAddingIngredient(false);
            }}
          >
            Add
          </button>
          <h1 className="text-2xl font-semibold">{ingredient.name}</h1>
        </div>

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
            <div className="flex gap-2 items-center">
              <h1>Servings:</h1>
              <input
                type="number"
                name="servingSize"
                value={numberOfServings || ""}
                onChange={(e) => setNumberOfServings(Number(e.target.value))}
                placeholder="0"
                className="border-b-2 border-gray-400 text-center w-10 font-bold"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="flex items-center justify-between text-2xl font-bold">
              <h1>Serving Size</h1>
              <p className="flex items-center">
                <input
                  type="number"
                  name="servingSize"
                  value={servingSize || ""}
                  onChange={(e) => setServingSize(Number(e.target.value))}
                  placeholder="0"
                  className="border-b-2 border-gray-400 text-center w-14"
                  step="0.01"
                  min="0"
                  required
                />
                {ingredient.servingUnit ? ingredient.servingUnit : "g"}
              </p>
            </div>
          </div>

          {/* Display Nutritional Facts */}
          <div className="space-y-2">
            {(
              Object.keys(NUTRITIONAL_KEYS) as Array<
                keyof typeof NUTRITIONAL_KEYS
              >
            ).map((key) => {
              if (
                ingredient?.[key] === null ||
                ingredient?.[key] === undefined
              ) {
                return null;
              }
              const value =
                (ingredient?.[key] ?? 0) *
                (numberOfServings ?? 1) *
                ((servingSize ?? 1) / (ingredient?.servingSize ?? 1));
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
          </div>
        </div>
      )}
    </div>
  );
}

export default AddIngredientInfo;

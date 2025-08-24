"use client";

import { InventoryRecipe } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type AddInventoryRecipeInfoProps = {
  recipe: InventoryRecipe;
};

function AddInventoryRecipeInfo({ recipe }: AddInventoryRecipeInfoProps) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="shadow-md">
      <div
        className={`bg-blue-900 text-white p-3 rounded-md flex items-center justify-between ${
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
        <div className="bg-white rounded-b-md p-3">
          {/* <div className="border-b-8 border-b-gray-800 pb-2 mb-2">
            <div>
              <h1 className="text-lg">
                {recipe.totalAmount} Total Servings
              </h1>
            </div>
            <div className="flex items-center justify-between text-2xl font-bold">
              <h1>Serving Size</h1>
              <p>
                {recipe.servingSize}
                {recipe.unit ? recipe.unit : "g"}
              </p>
            </div>
          </div> */}
          <div className="flex justify-between text-2xl font-bold">
            <h1>Total Amount:</h1>{" "}
            <h1>
              {recipe.totalAmount}
              {recipe.unit}
            </h1>
          </div>

          {/* Display Nutritional Facts */}
          {/* <div className="space-y-2">
            {(
              Object.keys(NUTRITIONAL_KEYS) as Array<
                keyof typeof NUTRITIONAL_KEYS
              >
            ).map((key) => {
              const value = recipe[key];
              if (value === null || value === undefined) return null; // Skip null/undefined values

              const unit = NUTRITIONAL_UNITS[key]; // Get the unit for the current key
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
              } // Get the unit for the current key

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
          </div> */}
        </div>
      )}
    </div>
  );
}

export default AddInventoryRecipeInfo;

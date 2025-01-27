"use client";

import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type Nutrition = {
  [key: string]: number | { amount: number; unit: string };
};

type Ingredient = {
  id: string;
  name: string;
  nutrition: Nutrition;
  servingSize?: number;
  servingUnit?: string;
  servingsPerContainer?: number;
  pricePerContainer?: number;
  howManyTimesUsed?: number;
  createdAt: Date;
};

type IngredientInfoProps = {
  ingredient: Ingredient;
};

function IngredientInfo({ ingredient }: IngredientInfoProps) {
  const [dropdown, setDropdown] = useState(false);
  const desiredOrder = ["calories", "protein", "carbs", "fats", "sodium"];

  return (
    <div className="shadow-md">
      <div
        className={`bg-mainGreen text-white p-3 rounded-md flex items-center justify-between ${
          dropdown && "rounded-b-none"
        }`}
      >
        <h1 className="text-2xl font-semibold">{ingredient.name}</h1>

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
          <div className="border-b-8 border-b-mainGreen pb-2 mb-2">
            <div>
              <h1 className="text-lg">
                {ingredient.servingsPerContainer} Servings Per Container
              </h1>
            </div>
            <div className="flex items-center justify-between text-2xl font-bold">
              <h1>Serving Size</h1>
              <p>
                {ingredient.servingSize}
                {ingredient.servingUnit ? ingredient.servingUnit : "g"}
              </p>
            </div>
          </div>

          {Object.keys(ingredient.nutrition)
            .sort((a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b))
            .map((nutritionMacro) => (
              <div
                className="flex items-center justify-between text-2xl"
                key={nutritionMacro}
              >
                <h1>
                  {nutritionMacro.charAt(0).toUpperCase() +
                    nutritionMacro.slice(1)}
                </h1>
                <p>
                  {nutritionMacro == "calories"
                    ? ingredient.nutrition["calories"] + ""
                    : typeof ingredient.nutrition[
                        nutritionMacro as keyof Nutrition
                      ] == "number"
                    ? ingredient.nutrition[nutritionMacro as keyof Nutrition] +
                      "g"
                    : (
                        ingredient.nutrition[
                          nutritionMacro as keyof Nutrition
                        ] as { amount: number; unit: string }
                      ).amount +
                      (
                        ingredient.nutrition[
                          nutritionMacro as keyof Nutrition
                        ] as { amount: number; unit: string }
                      ).unit}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default IngredientInfo;

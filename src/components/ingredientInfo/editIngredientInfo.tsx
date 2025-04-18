"use client";

import { NUTRITIONAL_KEYS } from "@/constants/NUTRITIONAL_KEYS";
import { NUTRITIONAL_UNITS } from "@/constants/NUTRITIONAL_UNITS";
import { Ingredient } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type EditIngredientInfoProps = {
  ingredient: Ingredient;
  numberOfServings: number | null;
  servingSize: number | null;
};

function EditIngredientInfo({
  ingredient,
  numberOfServings,
  servingSize,
}: EditIngredientInfoProps) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="">
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
        {/* <div
          className="bg-blue-200 p-2 text-black"
          onClick={() => console.log(ingredient)}
        >
          Test
        </div> */}
      </div>
      {dropdown && (
        <div className="bg-white rounded-b-md p-3 max-h-96 overflow-y-auto border-mainGreen border-[3px] border-t-0">
          <div className="border-b-8 border-b-mainGreen pb-2 mb-2">
            <div>
              <h1 className="text-lg">{numberOfServings} Servings</h1>
            </div>
            <div className="flex items-center justify-between text-2xl font-bold">
              <h1>Serving Size</h1>
              <p>
                {servingSize}
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
                (Number(ingredient?.[key]) || 0) *
                (Number(numberOfServings) || 1) *
                ((Number(servingSize) || 1) /
                  (Number(ingredient?.servingSize) || 1));

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

            {Object.keys(ingredient.extraNutrition ?? {}).map((key) => {
              if (!ingredient.extraNutrition?.[key]) return null;

              const value =
                (ingredient.extraNutrition[key].value ?? 0) *
                (numberOfServings ?? 1) *
                ((servingSize ?? 1) / (ingredient?.servingSize ?? 1));

              if (value === null || value === undefined) return null;

              let unit;
              if (ingredient.extraNutrition[key].unit == "percent") {
                unit = "%";
              } else {
                unit = ingredient.extraNutrition[key].unit;
              }

              return (
                <div
                  key={key}
                  className="flex items-center justify-between text-lg"
                >
                  <span>{ingredient.extraNutrition[key].label}</span>
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

export default EditIngredientInfo;

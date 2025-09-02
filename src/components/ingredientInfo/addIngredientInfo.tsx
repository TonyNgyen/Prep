"use client";

import { NUTRITIONAL_KEYS } from "@/constants/NUTRITIONAL_KEYS";
import { NUTRITIONAL_UNITS } from "@/constants/NUTRITIONAL_UNITS";
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
        className={`bg-gray-800 text-white p-3 rounded-md flex items-center justify-between ${
          dropdown && "rounded-b-none"
        }`}
      >
        <div className="flex gap-3">
          <button
            type="button"
            className="bg-white text-gray-800 px-2 rounded-md text-lg font-semibold"
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
        <div className="bg-white rounded-b-md p-3 max-h-96 overflow-y-auto border-gray-800 border-[3px] border-t-0">
          <div className="border-b-8 border-b-gray-800 pb-2 mb-2">
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

export default AddIngredientInfo;

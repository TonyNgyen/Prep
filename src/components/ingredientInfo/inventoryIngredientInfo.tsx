"use client";

import { addToInventory } from "@/lib/data";
import { Ingredient } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type InventoryIngredientInfoProps = {
  ingredient: Ingredient;
  add: (
    id: string,
    name: string,
    containers: number,
    servingSize: number,
    numberOfServings: number,
    totalNumber: number,
    unit: string
  ) => void;
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

function InventoryIngredientInfo({
  ingredient,
  add,
}: InventoryIngredientInfoProps) {
  const [dropdown, setDropdown] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addType, setAddType] = useState<string>("containers");
  const [containerNumber, setContainerNumber] = useState<number | null>(1);
  const [servingSize, setServingSize] = useState<number | null>(1);
  const [numberOfServings, setNumberOfServings] = useState<number | null>(1);

  const handleContainerNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setContainerNumber(value === "" ? null : Number(value));
  };

  const handleServingSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setServingSize(value === "" ? null : Number(value));
  };

  const handleNumberOfServingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNumberOfServings(value === "" ? null : Number(value));
  };

  const handleAddContainers = () => {
    if (!containerNumber) {
      return;
    }
    add(
      ingredient.id,
      ingredient.name,
      containerNumber,
      ingredient.servingSize,
      ingredient.servingsPerContainer,
      ingredient.servingSize *
        ingredient.servingsPerContainer *
        containerNumber,
      ingredient.servingUnit
    );
  };

  const handleAddServings = () => {
    if (!servingSize || !numberOfServings) {
      return;
    }
    add(
      ingredient.id,
      ingredient.name,
      1,
      servingSize,
      numberOfServings,
      servingSize * numberOfServings,
      ingredient.servingUnit
    );
  };

  const handleAdd = () => {
    if (addType == "containers") {
      handleAddContainers();
    } else {
      handleAddServings();
    }
  };

  return (
    <div className="shadow-md">
      <div
        className={`bg-mainGreen text-white p-3 rounded-md flex items-center justify-between ${
          dropdown && "rounded-b-none"
        }`}
      >
        <div className="flex gap-3">
          {!adding && (
            <button
              type="button"
              className="bg-white text-mainGreen px-2 rounded-md text-lg font-semibold"
              onClick={() => {
                setAdding(true);
              }}
            >
              Add
            </button>
          )}
          <h1 className="text-2xl font-semibold">{ingredient.name}</h1>
        </div>

        {!adding &&
          (dropdown ? (
            <IoMdArrowDropup
              className="text-4xl"
              onClick={() => setDropdown(false)}
            />
          ) : (
            <IoMdArrowDropdown
              className="text-4xl"
              onClick={() => setDropdown(true)}
            />
          ))}
      </div>
      {!adding && dropdown && (
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

          {/* Display Nutritional Facts */}
          <div className="space-y-2">
            {(
              Object.keys(NUTRITIONAL_KEYS) as Array<
                keyof typeof NUTRITIONAL_KEYS
              >
            ).map((key) => {
              const value = ingredient[key];
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

            {Object.keys(ingredient.extraNutrition ?? {}).map((key) => {
              if (!ingredient.extraNutrition?.[key]) return null;

              const value = ingredient.extraNutrition[key].value;

              if (value === null || value === undefined) return null;

              let unit;
              if (ingredient.extraNutrition[key].unit == "percent") {
                unit = "%";
              } else {
                unit = ingredient.extraNutrition[key].unit;
              } // Get the unit for the current key

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
      {adding && (
        <div className="bg-white rounded-b-md p-3">
          <div className="flex bg-mainGreen w-12/12 mx-auto h-10 rounded-md border-mainGreen border-[4px]">
            <button
              className={`w-1/2 rounded-l-md font-bold tracking-wide ${
                addType == "containers"
                  ? "bg-white text-mainGreen"
                  : " text-white"
              }`}
              type="button"
              onClick={() => setAddType("containers")}
            >
              Containers
            </button>
            <button
              className={`w-1/2 rounded-r-md font-bold tracking-wide ${
                addType == "servings"
                  ? "bg-white text-mainGreen"
                  : " text-white"
              }`}
              type="button"
              onClick={() => setAddType("servings")}
            >
              Servings
            </button>
          </div>
          <div>
            <div className="my-4">
              {addType == "containers" ? (
                <div>
                  <label className="block font-semibold">
                    Number of Containers
                  </label>
                  <input
                    type="number"
                    name="name"
                    placeholder="1"
                    value={containerNumber === null ? "" : containerNumber}
                    onChange={handleContainerNumberChange}
                    className="border rounded-md w-full p-2 border-gray-300"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-semibold">Serving Size</label>
                  <input
                    type="number"
                    name="name"
                    placeholder="1"
                    value={servingSize === null ? "" : servingSize}
                    onChange={handleServingSizeChange}
                    className="border rounded-md w-full p-2 border-gray-300"
                    required
                  />
                  <label className="block font-semibold">
                    Number of Servings
                  </label>
                  <input
                    type="number"
                    name="name"
                    placeholder="1"
                    value={numberOfServings === null ? "" : numberOfServings}
                    onChange={handleNumberOfServingsChange}
                    className="border rounded-md w-full p-2 border-gray-300"
                    required
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="w-1/2 bg-negativeRed p-1 text-lg font-bold text-white rounded-md"
              type="button"
              onClick={() => {
                setAdding(false);
                setDropdown(false);
              }}
            >
              Cancel
            </button>
            <button
              className="w-1/2 bg-mainGreen p-1 text-lg font-bold text-white rounded-md"
              onClick={() => handleAdd()}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryIngredientInfo;

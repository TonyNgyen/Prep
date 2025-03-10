import { Recipe } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type InventoryRecipeInfoProps = {
  recipe: Recipe;
  add: (
    id: string,
    name: string,
    servings: number,
    servingSize: number,
    totalAmount: number,
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

function LogRecipeInfo({ recipe, add }: InventoryRecipeInfoProps) {
  const [dropdown, setDropdown] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addType, setAddType] = useState<string>("numberOfRecipes");
  const [numberOfRecipes, setAmount] = useState<number | null>(1);
  const [numberOfServings, setNumberOfServings] = useState<number | null>(1);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value === "" ? null : Number(value));
  };

  const handleServingSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberOfServings(value === "" ? null : Number(value));
  };

  const handleAddAmount = () => {
    if (!numberOfRecipes || !recipe.servingSize) {
      return;
    }
    add(
      recipe.id,
      recipe.name,
      numberOfRecipes * recipe.numberOfServings,
      recipe.servingSize,
      numberOfRecipes * recipe.numberOfServings * recipe.servingSize,
      recipe.servingUnit
    );
  };

  const handleAddServings = () => {
    if (!numberOfServings) {
      return;
    }
    add(
      recipe.id,
      recipe.name,
      numberOfServings,
      recipe.servingSize,
      numberOfServings * recipe.servingSize,
      recipe.servingUnit
    );
  };

  const handleAdd = () => {
    if (addType == "numberOfRecipes") {
      handleAddAmount();
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
          <h1 className="text-2xl font-semibold">{recipe.name}</h1>
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
        <div className="bg-white rounded-b-md p-3 max-h-96 overflow-y-auto border-mainGreen border-[3px] border-t-0">
          <div className="border-b-8 border-b-mainGreen pb-2 mb-2">
            <div>
              <h1 className="text-lg">
                {recipe.numberOfServings} Servings Per Recipe
              </h1>
            </div>
            <div className="flex items-center justify-between text-2xl font-bold">
              <h1>Serving Size</h1>
              <p>
                {recipe.servingSize}
                {recipe.servingUnit ? recipe.servingUnit : "g"}
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
          </div>
        </div>
      )}
      {adding && (
        <div className="bg-white rounded-b-md p-3">
          <div className="flex bg-mainGreen w-12/12 mx-auto h-10 rounded-md border-mainGreen border-[4px]">
            <button
              className={`w-1/2 rounded-l-md font-bold tracking-wide ${
                addType == "numberOfRecipes"
                  ? "bg-white text-mainGreen"
                  : " text-white"
              }`}
              type="button"
              onClick={() => setAddType("numberOfRecipes")}
            >
              Recipes
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
              {addType == "numberOfRecipes" ? (
                <div>
                  <label className="block font-semibold">
                    Number of Recipes
                  </label>
                  <input
                    type="number"
                    name="name"
                    placeholder="1"
                    value={numberOfRecipes === null ? "" : numberOfRecipes}
                    onChange={handleAmountChange}
                    className="border rounded-md w-full p-2 border-gray-300"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-semibold">
                    Number of Servings
                  </label>
                  <input
                    type="number"
                    name="name"
                    placeholder="1"
                    value={numberOfServings === null ? "" : numberOfServings}
                    onChange={handleServingSizeChange}
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

export default LogRecipeInfo;

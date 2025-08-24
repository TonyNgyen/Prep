import { NUTRITIONAL_KEYS } from "@/constants/NUTRITIONAL_KEYS";
import { NUTRITIONAL_UNITS } from "@/constants/NUTRITIONAL_UNITS";
import {
  addRecipe,
  addRecipeToInventory,
  fetchIngredientsList,
} from "@/lib/data";
import { Recipe, UserInventory } from "@/types";
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
  inventory: UserInventory;
};

function InventoryRecipeInfo({
  recipe,
  add,
  inventory,
}: InventoryRecipeInfoProps) {
  const [dropdown, setDropdown] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addType, setAddType] = useState<string>("numberOfRecipes");
  const [numberOfRecipes, setAmount] = useState<number | null>(1);
  const [numberOfServings, setNumberOfServings] = useState<number | null>(1);
  const filterInventory = (inventory: Record<string, any>, ids: string[]) => {
    return Object.fromEntries(
      Object.entries(inventory).filter(([key]) => ids.includes(key))
    );
  };
  const inventoryOfIngredients = filterInventory(
    inventory,
    Object.keys(recipe.ingredientList)
  );

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
    addRecipeToInventory(
      inventory,
      recipe,
      {
        id: recipe.id,
        name: recipe.name,
        numberOfServings: numberOfRecipes * recipe.numberOfServings,
        servingSize: recipe.servingSize,
        totalAmount:
          numberOfRecipes * recipe.numberOfServings * recipe.servingSize,
        unit: recipe.servingUnit,
        type: "recipe",
      },
      true,
      true
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
    addRecipeToInventory(
      inventory,
      recipe,
      {
        id: recipe.id,
        name: recipe.name,
        numberOfServings: numberOfServings,
        servingSize: recipe.servingSize,
        totalAmount: numberOfServings * recipe.servingSize,
        unit: recipe.servingUnit,
        type: "recipe",
      },
      true,
      true
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
        className={`bg-gray-800 text-white p-3 rounded-md flex items-center justify-between ${
          dropdown && "rounded-b-none"
        }`}
      >
        <div className="flex gap-3">
          {!adding && (
            <button
              type="button"
              className="bg-white text-gray-800 px-2 rounded-md text-lg font-semibold"
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
        <div className="bg-white rounded-b-md p-3 max-h-96 overflow-y-auto border-gray-800 border-[3px] border-t-0">
          <div className="border-b-8 border-b-gray-800 pb-2 mb-2">
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
      {adding && (
        <div className="bg-white rounded-b-md p-3">
          <div className="flex bg-gray-800 w-12/12 mx-auto h-10 rounded-md border-gray-800 border-[4px]">
            <button
              className={`w-1/2 rounded-l-md font-bold tracking-wide ${
                addType == "numberOfRecipes"
                  ? "bg-white text-gray-800"
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
                  ? "bg-white text-gray-800"
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
              className="w-1/2 bg-gray-800 p-1 text-lg font-bold text-white rounded-md"
              onClick={() => handleAdd()}
            >
              Confirm
            </button>
            {/* <button
              type="button"
              className="w-1/2 bg-blue-700 p-1 text-lg font-bold text-white rounded-md"
              onClick={() =>
                console.log(inventory)
              }
            >
              Test 1
            </button>
            <button
              type="button"
              className="w-1/2 bg-purple-700 p-1 text-lg font-bold text-white rounded-md"
              onClick={() =>
                addRecipeToInventory(
                  inventory,
                  recipe,
                  {
                    id: recipe.id,
                    name: recipe.name,
                    servings: numberOfServings ?? 1,
                    servingSize: recipe.servingSize,
                    totalAmount: (numberOfServings ?? 1) * recipe.servingSize,
                    unit: recipe.servingUnit,
                    type: "recipe",
                  },
                  true,
                  true
                )
              }
            >
              Test 2
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryRecipeInfo;

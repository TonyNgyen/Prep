"use client";

import {
  Ingredient,
  InventoryIngredient,
  InventoryRecipe,
  NutritionFacts,
} from "@/types";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { NUTRITIONAL_KEYS } from "@/constants/NUTRITIONAL_KEYS";
import { NUTRITIONAL_UNITS } from "@/constants/NUTRITIONAL_UNITS";

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

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
  inventory: ItemsToAdd;
  setInventory: React.Dispatch<React.SetStateAction<ItemsToAdd>>;
  setNutrition: React.Dispatch<React.SetStateAction<NutritionFacts>>;
  nutrition: NutritionFacts;
};

function LogIngredientInfo({
  ingredient,
  add,
  inventory,
  setInventory,
  setNutrition,
  nutrition,
}: InventoryIngredientInfoProps) {
  const [dropdown, setDropdown] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addType, setAddType] = useState<string>("containers");
  const [numberOfContainers, setNumberOfContainers] = useState<number | null>(
    1
  );
  const [servingSize, setServingSize] = useState<number | null>(1);
  const [numberOfServings, setNumberOfServings] = useState<number | null>(1);
  const [checkInventory, setCheckInventory] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (checkInventory) {
      checkInventoryAmount();
    }
  }, [
    numberOfContainers,
    checkInventory,
    servingSize,
    numberOfServings,
    addType,
  ]);

  const handleContainerNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNumberOfContainers(value === "" ? null : Number(value));
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
    if (!numberOfContainers) {
      return;
    }
    add(
      ingredient.id,
      ingredient.name,
      numberOfContainers,
      ingredient.servingSize,
      ingredient.servingsPerContainer,
      ingredient.servingSize *
        ingredient.servingsPerContainer *
        numberOfContainers,
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

  const checkInventoryAmount = () => {
    if (addType == "containers") {
      if (!numberOfContainers) {
        setError("Please fill in the number of containers");
        return false;
      }
      if (!inventory[ingredient.id]) {
        setError("Food not in inventory");
        return false;
      }
      const total =
        numberOfContainers *
        ingredient.servingSize *
        ingredient.servingsPerContainer;
      if (total > inventory[ingredient.id].totalAmount) {
        setError("Not enough amount in inventory");
        return false;
      }
    } else {
      if (!servingSize) {
        setError("Please fill in the serving size");
        return false;
      }
      if (!numberOfServings) {
        setError("Please fill in the number of servings");
        return false;
      }
      if (!inventory[ingredient.id]) {
        setError("Food not in inventory");
        return false;
      }
      const total = servingSize * numberOfServings;
      if (total > inventory[ingredient.id].totalAmount) {
        setError("Not enough amount in inventory");
        return false;
      }
    }
    setError(null);
    return true;
  };

  const checkValidInput = () => {
    if (addType == "containers") {
      if (!numberOfContainers) {
        setError("Please fill in the number of containers");
        return false;
      }
    } else {
      if (!servingSize) {
        setError("Please fill in the serving size");
        return false;
      }
      if (!numberOfServings) {
        setError("Please fill in the number of servings");
        return false;
      }
    }
    setError(null);
    return true;
  };

  const updateInventoryAmount = (total: number) => {
    setInventory((prevInventory) => ({
      ...prevInventory,
      [ingredient.id]: {
        ...prevInventory[ingredient.id],
        totalAmount: prevInventory[ingredient.id].totalAmount - total,
      },
    }));
  };

  const handleAdd = () => {
    if (addType == "containers") {
      if (!numberOfContainers) {
        setError("Please fill in the number of containers");
        return;
      }
      if (!checkValidInput()) {
        return;
      }
      if (checkInventory) {
        if (!checkInventoryAmount()) {
          return;
        }
        const total =
          numberOfContainers *
          ingredient.servingSize *
          ingredient.servingsPerContainer;
        updateInventoryAmount(total);
      }
      handleAddContainers();
    } else {
      if (!servingSize) {
        setError("Please fill in the serving size");
        return;
      }
      if (!numberOfServings) {
        setError("Please fill in the number of servings");
        return;
      }
      if (checkInventory) {
        if (!checkInventoryAmount()) {
          return;
        }
        const total = servingSize * numberOfServings;
        updateInventoryAmount(total);
      }
      handleAddServings();
    }
    addNutrition();
  };

  const addNutrition = () => {
    let multiplier;
    if (addType == "containers") {
      multiplier = (numberOfContainers ?? 0) * ingredient.servingsPerContainer;
    } else {
      multiplier =
        ((servingSize ?? 0) * (numberOfServings ?? 0)) / ingredient.servingSize;
    }
    const newNutrition = { ...nutrition };
    console.log(ingredient);
    Object.keys(NUTRITIONAL_KEYS).map((nutritionalKey) => {
      const key = nutritionalKey as keyof NutritionFacts;

      if (key === "extraNutrition") return;

      const ingredientValue = (ingredient[key] as number | null) ?? 0;

      newNutrition[key] += ingredientValue * multiplier;
    });
    if (ingredient.extraNutrition != null) {
      Object.keys(ingredient.extraNutrition).map((key) => {
        const ingredientExtra = ingredient.extraNutrition[key];

        if (!newNutrition.extraNutrition[key]) {
          newNutrition.extraNutrition[key] = { ...ingredientExtra, value: 0 };
        }
        newNutrition.extraNutrition[key].value +=
          ingredientExtra.value * multiplier;
      });
    }
    console.log(newNutrition);
    setNutrition(newNutrition);
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

          <div className="space-y-2">
            {(
              Object.keys(NUTRITIONAL_KEYS) as Array<
                keyof typeof NUTRITIONAL_KEYS
              >
            ).map((key) => {
              const value = ingredient[key];
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

              const value = ingredient.extraNutrition[key].value;

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
                    value={
                      numberOfContainers === null ? "" : numberOfContainers
                    }
                    onChange={(e) => {
                      handleContainerNumberChange(e);
                    }}
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
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={checkInventory}
                  onChange={() => {
                    setCheckInventory((prev) => {
                      const newValue = !prev;
                      if (newValue) {
                        checkInventoryAmount();
                      } else {
                        checkValidInput();
                      }
                      return newValue;
                    });
                  }}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md transition ${
                    checkInventory
                      ? "bg-mainGreen border-mainGreen"
                      : "bg-white"
                  }`}
                >
                  {checkInventory && (
                    <FaCheck size={16} className="text-white" />
                  )}
                </div>
                <span>Update Inventory</span>
              </label>

              {error && (
                <div className="bg-negativeRed text-center p-2 mt-2 rounded-md text-white font-bold">
                  {error}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="w-1/2 bg-white border-mainGreen border-2 p-1 text-lg font-bold text-mainGreen rounded-md"
              type="button"
              onClick={() => {
                setAdding(false);
                setDropdown(false);
              }}
            >
              Cancel
            </button>
            <button
              className="w-1/2 bg-mainGreen p-1 text-lg font-bold border-mainGreen border-2 text-white rounded-md"
              onClick={() => handleAdd()}
            >
              Confirm
            </button>
            <button
              className="w-1/2 bg-mainGreen p-1 text-lg font-bold border-mainGreen border-2 text-white rounded-md"
              onClick={() => addNutrition()}
            >
              Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogIngredientInfo;

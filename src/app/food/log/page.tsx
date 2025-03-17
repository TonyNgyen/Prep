"use client";

import {
  addToMealHistory,
  addToNutritionalHistory,
  fetchInventory,
  fetchMealHistory,
} from "@/lib/data";
import { InventoryIngredient, InventoryRecipe, NutritionFacts } from "@/types";
import React, { useEffect, useState } from "react";
import Page1 from "./page1";
import Page2 from "./page2";

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

function LogFoodPage() {
  const [logFood, setLogFood] = useState<ItemsToAdd>({});
  const [nutrition, setNutrition] = useState<NutritionFacts>({
    calories: 0,
    protein: 0,
    totalFat: 0,
    saturatedFat: 0,
    polyunsaturatedFat: 0,
    monounsaturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    totalCarbohydrates: 0,
    sugars: 0,
    addedSugars: 0,
    sugarAlcohols: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    extraNutrition: {},
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [inventory, setInventory] = useState<ItemsToAdd>({});
  const [meal, setMeal] = useState<string>("");

  const addLogIngredient = (
    id: string,
    name: string,
    containers: number,
    servingSize: number,
    numberOfServings: number,
    totalAmount: number,
    unit: string,
    type: string
  ) => {
    setLogFood((prev) => ({
      ...prev,
      [id]: {
        id,
        name,
        containers,
        servingSize,
        numberOfServings,
        totalAmount,
        unit,
        type,
      },
    }));
  };

  const addLogRecipe = (
    id: string,
    name: string,
    servings: number,
    servingSize: number,
    totalAmount: number,
    unit: string,
    type: string
  ) => {
    setLogFood((prev) => ({
      ...prev,
      [id]: {
        id,
        name,
        servings,
        servingSize,
        totalAmount,
        unit,
        type,
      },
    }));
  };

  useEffect(() => {
    const getInventory = async () => {
      const fetch = await fetchInventory();
      setInventory(fetch || {});
    };

    getInventory();
  }, []);

  return (
    <div className="p-6 pb-[4rem] flex flex-col relative h-[calc(100vh-5rem)] gap-3">
      <h1 className="text-3xl font-bold mb-2">Log Food</h1>
      <div className="overflow-scroll pb-6 h-[calc(100vh-5rem)]">
        {pageNumber == 1 && (
          <Page1
            addLogIngredient={addLogIngredient}
            addLogRecipe={addLogRecipe}
            nutrition={nutrition}
            setNutrition={setNutrition}
            inventory={inventory}
            setInventory={setInventory}
            meal={meal}
            setMeal={setMeal}
          />
        )}
        {pageNumber == 2 && (
          <Page2
            nutrition={nutrition}
            logFood={logFood}
            inventory={inventory}
          />
        )}
      </div>
      <div className="w-full flex justify-between absolute bottom-0 left-0 px-6 py-3 h-16">
        {pageNumber != 1 ? (
          <button
            type="button"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber - 1)
            }
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        {pageNumber != 2 ? (
          <button
            type="button"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber + 1)
            }
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={() => {
              addToNutritionalHistory(nutrition);
              addToMealHistory(meal, { nutrition: nutrition, food: logFood });
            }}
          >
            Log Food
          </button>
        )}
        {/* <div
          className="p-2 bg-purple-200"
          onClick={() =>
            addToMealHistory(meal, { nutrition: nutrition, food: logFood })
          }
        >
          Test Function
        </div>
        <div className="p-2 bg-orange-200" onClick={() => fetchMealHistory()}>
          Meal History
        </div> */}
      </div>
    </div>
  );
}

export default LogFoodPage;

"use client";

import { searchIngredient, searchRecipe } from "@/lib/data";
import {
  Ingredient,
  InventoryIngredient,
  InventoryRecipe,
  Recipe,
} from "@/types";
import React, { useState } from "react";
import Page1 from "./page1";
import Page2 from "./page2";

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

function LogFoodPage() {
  const [logFood, setLogFood] = useState<ItemsToAdd>({});
  const [nutrients, setNutrients] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const addIngredient = (
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

  const addRecipe = (
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

  return (
    <div className="p-6 pb-[4rem] flex flex-col relative h-[calc(100vh-5rem)] gap-3">
      <div className="">
        <h1 className="text-3xl font-bold mb-2">Log Food</h1>
        <div className="overflow-scroll pb-6">
          {pageNumber == 1 && <Page1 />}
          {pageNumber == 2 && <Page2 />}
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
              type="submit"
              className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            >
              Log Food
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogFoodPage;

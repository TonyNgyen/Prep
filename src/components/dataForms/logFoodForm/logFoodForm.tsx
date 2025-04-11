"use client";

import {
  addToMealHistory,
  addToNutritionalHistory,
  fetchInventory,
  updateInventoryItems,
} from "@/lib/data";
import { InventoryIngredient, InventoryRecipe, NutritionFacts } from "@/types";
import React, { useEffect, useState } from "react";
import Page1 from "./page1";
import Page2 from "./page2";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/pageHeader/pageHeader";
import { IoIosClose } from "react-icons/io";

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

type LogFoodFormProps = {
  dateInput: string | null;
  mealInput: string | null;
  setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
};

function LogFoodForm({
  dateInput,
  mealInput,
  setShowAddForm,
  isForm,
}: LogFoodFormProps) {
  const router = useRouter();
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
    dietaryFiber: 0,
    totalSugars: 0,
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
  const [meal, setMeal] = useState<string>(mealInput ? mealInput : "");
  const date = dateInput ? dateInput : new Date().toISOString().split("T")[0];

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
    setLogFood((prev) => {
      if (prev[id]) {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            totalAmount: prev[id].totalAmount + totalAmount,
          },
        };
      }
      return {
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
      };
    });
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
    setLogFood((prev) => {
      if (prev[id]) {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            totalAmount: prev[id].totalAmount + totalAmount,
          },
        };
      }
      return {
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
      };
    });
  };

  useEffect(() => {
    const getInventory = async () => {
      const fetch = await fetchInventory();
      setInventory(fetch || {});
    };

    getInventory();
  }, []);

  return (
    <div className="fixed top-0 left-0 bg-[#F9FAFB] w-full p-6 pb-[4rem] flex flex-col h-[calc(100vh-5rem)] gap-3">
      <div className="flex justify-between items-center">
        <PageHeader>Log Food</PageHeader>
        {isForm && setShowAddForm && (
          <button onClick={() => setShowAddForm(false)} className="flex2">
            <IoIosClose className="text-4xl flex" />
          </button>
        )}
      </div>
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
            className={`bg-mainGreen text-white font-semibold rounded-md px-4 py-2 ${
              (!meal || !Object.keys(logFood).length) && "opacity-50"
            }`}
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber + 1)
            }
            disabled={!meal || !Object.keys(logFood).length}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={async () => {
              await addToNutritionalHistory(date, nutrition, meal);
              await addToMealHistory(
                meal,
                {
                  food: logFood,
                },
                date
              );
              await updateInventoryItems(logFood);
              router.push("/");
            }}
          >
            Log Food
          </button>
        )}
      </div>
    </div>
  );
}

export default LogFoodForm;

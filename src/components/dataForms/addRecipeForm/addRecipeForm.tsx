"use client";

import { Ingredient, NutritionFacts } from "@/types";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Page3 from "./page3/page3";
import Page2 from "./page2/page2";
import Page1 from "./page1/page1";

type formProp = {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
};

function AddRecipeForm({ setShowAddForm, isForm }: formProp) {
  const [pageNumber, setPageNumber] = useState(1);

  const [ingredientList, setIngredientList] = useState<
    Record<
      string,
      {
        ingredient: Ingredient;
        numberOfServings: number;
        servingSize: number | null;
      }
    >
  >({});

  const [ingredientIdList, setIngredientIdList] = useState<Object>({});
  const [name, setName] = useState<string>("");
  const [totalServingSize, setTotalServingSize] = useState<number>(0);
  const [recipeNutrition, setRecipeNutrition] = useState<NutritionFacts>({
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
  });

  const removeIngredient = (ingredientId: string) => {};

  useEffect(() => {
    const sumNutrition = () => {
      const total = Object.values(ingredientList).reduce(
        (acc, { ingredient, numberOfServings, servingSize }) => {
          for (const key in acc) {
            const typedKey = key as keyof typeof acc;
            acc[typedKey] +=
              ((ingredient[typedKey] ?? 0) *
                numberOfServings *
                (servingSize ?? 0)) /
              (ingredient.servingSize ?? 1);
          }
          return acc;
        },
        {
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
        }
      );
      setRecipeNutrition(total);
    };
    sumNutrition();
  }, [ingredientList]);

  return (
    <div className="p-6 pb-[4rem] flex flex-col relative h-[calc(100vh-5rem)] gap-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Add {name || "Recipe"}</h1>
        {isForm && (
          <button onClick={() => setShowAddForm(false)} className="flex2">
            <IoIosClose className="text-5xl flex" />
          </button>
        )}
      </div>
      <div className="overflow-scroll pb-6">
        {pageNumber == 1 && (
          <Page1
            setName={setName}
            setTotalServingSize={setTotalServingSize}
            name={name}
            totalServingSize={totalServingSize}
          />
        )}
        {pageNumber == 2 && (
          <Page2
            ingredientList={ingredientList}
            setIngredientList={setIngredientList}
            ingredientIdList={ingredientIdList}
            setIngredientIdList={setIngredientIdList}
          />
        )}
        {pageNumber == 3 && (
          <Page3
            ingredientList={ingredientList}
            setIngredientList={setIngredientList}
            ingredientIdList={ingredientIdList}
            setIngredientIdList={setIngredientIdList}
            recipeNutrition={recipeNutrition}
            name={name}
            totalServingSize={totalServingSize}
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
        {pageNumber != 3 ? (
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
            Add Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default AddRecipeForm;

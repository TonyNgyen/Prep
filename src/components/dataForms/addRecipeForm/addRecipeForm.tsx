"use client";

import { Ingredient, NutritionFacts } from "@/types";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Page3 from "./page3/page3";
import Page2 from "./page2/page2";
import Page1 from "./page1/page1";
import { useRouter } from "next/navigation";
import { addRecipe } from "@/lib/data";

type formProp = {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
};

function AddRecipeForm({ setShowAddForm, isForm }: formProp) {
  const router = useRouter();
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
  const [numberOfServings, setNumberOfServings] = useState<number>(0);
  const [servingSize, setServingSize] = useState<number>(0);
  const [servingUnit, setServingUnit] = useState<string>("g");
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

  const removeIngredient = (ingredientId: string) => {};

  useEffect(() => {
    const sumNutrition = () => {
      const total = Object.values(ingredientList).reduce(
        (acc, { ingredient, numberOfServings, servingSize }) => {
          for (const key of Object.keys(acc)) {
            if (key === "extraNutrition") continue;

            if (
              key in acc &&
              typeof acc[key as keyof typeof acc] === "number"
            ) {
              const typedKey = key as keyof Omit<typeof acc, "extraNutrition">;
              acc[typedKey] +=
                ((ingredient[typedKey] ?? 0) *
                  numberOfServings *
                  (servingSize ?? 0)) /
                (ingredient.servingSize ?? 1);
            }
          }

          for (const [extraKey, extraValue] of Object.entries(
            ingredient.extraNutrition || {}
          )) {
            if (!acc.extraNutrition[extraKey]) {
              acc.extraNutrition[extraKey] = { ...extraValue, value: 0 };
            }
            acc.extraNutrition[extraKey].value +=
              ((extraValue.value ?? 0) *
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
          dietaryFiber: 0,
          totalSugars: 0,
          addedSugars: 0,
          sugarAlcohols: 0,
          vitaminA: 0,
          vitaminC: 0,
          vitaminD: 0,
          calcium: 0,
          iron: 0,
          extraNutrition: {} as Record<
            string,
            {
              key: string;
              label: string | null;
              unit: string | null;
              value: number;
            }
          >,
        }
      );

      setRecipeNutrition(total);
    };

    sumNutrition();
  }, [ingredientList]);

  const handleSubmit = async () => {
    if (
      await addRecipe(
        name,
        recipeNutrition,
        ingredientIdList,
        numberOfServings,
        servingSize,
        servingUnit
      )
    ) {
      router.push("/");
    }
  };

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
      <div className="overflow-scroll pb-6 h-[calc(100vh-5rem)]">
        {pageNumber == 1 && (
          <Page1
            setName={setName}
            setNumberOfServings={setNumberOfServings}
            setServingSize={setServingSize}
            setServingUnit={setServingUnit}
            name={name}
            numberOfServings={numberOfServings}
            servingSize={servingSize}
            servingUnit={servingUnit}
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
            numberOfServings={numberOfServings}
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
            onClick={() => handleSubmit()}
          >
            Add Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default AddRecipeForm;

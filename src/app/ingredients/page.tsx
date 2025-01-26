"use client";

import AddIngredientForm from "@/components/dataForms/addIngredientForm/addIngredientForm";
import IngredientInfo from "@/components/ingredientsPage/ingredientInfo/ingredientInfo";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getIngredients } from "@/lib/data";

// Define a type for the nutrition information
type Nutrition = {
  [key: string]: number | { amount: number; unit: string };
};

// Define a type for the ingredient
type Ingredient = {
  id: string;
  name: string;
  nutrition: Nutrition;
  servingSize?: number;
  servingUnit?: string;
  servingsPerContainer?: number;
  pricePerContainer?: number;
  howManyTimesUsed?: number;
};

// Define a type for the ingredients list
type IngredientsList = {
  [key: string]: Ingredient;
};

function IngredientsPage() {
  const [ingredientsList, setIngredientList] = useState<IngredientsList>({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getIngredients();

        if (data == undefined) {
          return;
        }

        // Convert array to object keyed by ingredient ID
        const formattedData: IngredientsList = data.reduce(
          (acc, ingredient) => {
            acc[ingredient.id] = ingredient;
            return acc;
          },
          {} as IngredientsList
        );

        setIngredientList(formattedData);
      } catch (error) {
        console.error("Failed to load ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  } else if (showAddForm) {
    return <AddIngredientForm setShowAddForm={setShowAddForm} isForm={true} />;
  } else {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Ingredients</h1>
        <div className="flex gap-4  mb-4">
          <button
            className="bg-mainGreen text-white p-2 px-4 rounded-md font-semibold text-lg"
            onClick={() => setShowAddForm(true)}
          >
            Add Ingredient
          </button>
          <button>Filter</button>
          <button>Sort</button>
        </div>
        {Object.keys(ingredientsList).map((ingredientId) => {
          const ingredient = ingredientsList[ingredientId];
          return <IngredientInfo key={ingredient.id} ingredient={ingredient} />;
        })}
      </div>
    );
  }
}

export default IngredientsPage;

"use client";

import AddIngredientForm from "@/components/dataForms/addIngredientForm/addIngredientForm";
import IngredientInfo from "@/components/ingredientsPage/ingredientInfo/ingredientInfo";
import React, { useEffect, useState } from "react";

// Define a type for the nutrition information
type Nutrition = {
  [key: string]: number | { amount: number; unit: string };
};

// Define a type for the ingredient
type Ingredient = {
  id: string;
  name: string;
  nutrition: Nutrition;
  servingSize: number;
  servingUnit: string;
  servingsPerContainer: number;
  pricePerContainer: number;
  historicalServingsUsage: number;
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
    setIngredientList({
      "1": {
        id: "1",
        name: "Ground Beef",
        nutrition: {
          calories: 400,
          protein: 40,
          carbs: 30,
          fats: 20,
          sodium: { amount: 40, unit: "mg" },
        },
        servingSize: 4,
        servingUnit: "g",
        servingsPerContainer: 4,
        pricePerContainer: 10,
        historicalServingsUsage: 2,
      },
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  } else if (showAddForm) {
    return <AddIngredientForm setShowAddForm={setShowAddForm} />;
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

  // return (
  //   <div>
  //     {loading ? (
  //       <h1>Loading</h1>
  //     ) : (
  //       <div className="p-6">
  //         <h1 className="text-3xl font-bold mb-2">Ingredients</h1>
  //         <div className="flex gap-4  mb-4">
  //           <button className="bg-mainGreen text-white p-2 px-4 rounded-md font-semibold text-lg">
  //             Add Ingredient
  //           </button>
  //           <button>Filter</button>
  //           <button>Sort</button>
  //         </div>
  //         {Object.keys(ingredientsList).map((ingredientId) => {
  //           const ingredient = ingredientsList[ingredientId];
  //           return (
  //             <IngredientInfo key={ingredient.id} ingredient={ingredient} />
  //           );
  //         })}
  //       </div>
  //     )}
  //   </div>
  // );
}

export default IngredientsPage;

"use client";

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

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Ingredients</h1>
          {Object.keys(ingredientsList).map((ingredientId) => {
            const ingredient = ingredientsList[ingredientId];
            return (
              <IngredientInfo key={ingredient.id} ingredient={ingredient} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default IngredientsPage;

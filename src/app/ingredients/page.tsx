"use client";

import AddIngredientForm from "@/components/dataForms/addIngredientForm/addIngredientForm";
import IngredientInfo from "@/components/ingredientsPage/ingredientInfo/ingredientInfo";
import React, { useEffect, useState } from "react";
import { getIngredients } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";

type Nutrition = {
  [key: string]: number | { amount: number; unit: string };
};

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

type IngredientsList = {
  [key: string]: Ingredient;
};

function IngredientsPage() {
  const [ingredientsList, setIngredientList] = useState<IngredientsList>({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchIngredients = async () => {
      if (!currentUser) {
        return;
      }
      try {
        setLoading(true);
        if (!currentUser) {
          console.warn("No user is logged in");
          setLoading(false);
          return;
        }

        const data = await getIngredients(currentUser.uid);

        if (!data) {
          setIngredientList({});
          setLoading(false);
          return;
        }

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
  }, [currentUser]);

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
          {/* <button>Filter</button>
          <button>Sort</button> */}
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

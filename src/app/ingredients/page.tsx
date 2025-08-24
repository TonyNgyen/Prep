"use client";

import AddIngredientForm from "@/components/dataForms/addIngredientForm/addIngredientForm";
import IngredientInfo from "@/components/ingredientInfo/ingredientInfo";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Ingredient } from "@/types";
import PageHeader from "@/components/pageHeader/pageHeader";

function IngredientsPage() {
  const [ingredientsList, setIngredientList] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      const supabase = createClient();
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError) {
          console.error("Error fetching user:", userError);
          return;
        }

        const userId = userData?.user?.id;

        const { data: fetchUserData, error: fetchUserError } = await supabase
          .from("users")
          .select()
          .eq("uid", userId);

        if (fetchUserError || !fetchUserData || fetchUserData.length === 0) {
          console.error("Error fetching user data:", fetchUserError);
          return;
        }

        const ingredientIdList = fetchUserData[0].ingredients;
        console.log(ingredientIdList);

        const { data: fetchIngredientData, error: fetchIngredientError } =
          await supabase
            .from("ingredients")
            .select()
            .in("id", ingredientIdList);

        if (fetchIngredientError || !fetchIngredientData) {
          console.error("Error fetching ingredients:", fetchIngredientError);
          return;
        }

        setIngredientList(fetchIngredientData);
        setLoading(false);
      } catch (error) {
        console.error("Unexpected error:", error);
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
      <div className="p-6 pb-[6.5rem]">
        <PageHeader>Ingredients</PageHeader>
        <div className="flex gap-4  mb-4">
          <button
            className="bg-gray-800 text-white p-2 px-4 rounded-md font-semibold text-lg"
            onClick={() => setShowAddForm(true)}
          >
            Add Ingredient
          </button>
        </div>
        <div className="space-y-3">
          {ingredientsList.map((ingredient) => {
            return (
              <IngredientInfo key={ingredient.id} ingredient={ingredient} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default IngredientsPage;

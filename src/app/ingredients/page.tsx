"use client";

import AddIngredientForm from "@/components/dataForms/addIngredientForm/addIngredientForm";
import IngredientInfo from "@/components/ingredientsPage/ingredientInfo/ingredientInfo";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Ingredient } from "@/types";

function IngredientsPage() {
  const supabase = createClient();
  const [ingredientsList, setIngredientList] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        //console.log("1");
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        //console.log("8");

        if (userError) {
          console.error("Error fetching user:", userError);
          return;
        }
        //console.log("2");

        const userId = userData?.user?.id;

        const { data: fetchUserData, error: fetchUserError } = await supabase
          .from("users")
          .select()
          .eq("uid", userId);

        if (fetchUserError || !fetchUserData || fetchUserData.length === 0) {
          console.error("Error fetching user data:", fetchUserError);
          return;
        }
        //console.log("3");

        const ingredientIdList = fetchUserData[0].ingredients;

        const { data: fetchIngredientData, error: fetchIngredientError } =
          await supabase
            .from("ingredients")
            .select()
            .in("id", ingredientIdList);

        if (fetchIngredientError || !fetchIngredientData) {
          console.error("Error fetching ingredients:", fetchIngredientError);
          return;
        }
        //console.log("4");

        setIngredientList(fetchIngredientData);
        setLoading(false);
        //console.log("5");
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchIngredients();
  }, [supabase]);

  if (loading) {
    return <h1>Loading</h1>;
  } else if (showAddForm) {
    return <AddIngredientForm setShowAddForm={setShowAddForm} isForm={true} />;
  } else {
    return (
      <div className="p-6 pb-[6.5rem]">
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

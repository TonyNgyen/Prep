"use client";

import Dropdown from "@/components/dropdown/dropdown";
import AddIngredientInfo from "@/components/ingredientInfo/addIngredientInfo";
import EditIngredientInfo from "@/components/ingredientInfo/editIngredientInfo";
import IngredientInfo from "@/components/ingredientInfo/ingredientInfo";
import { Ingredient } from "@/types";
import { createClient } from "@/utils/supabase/client";
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
  const supabase = createClient();
  const [pageNumber, setPageNumber] = useState(1);
  const [addingIngredient, setAddingIngredient] = useState(false);

  const [name, setName] = useState("");

  const [ingredientSearch, setIngredientSearch] = useState("");
  const [ingredientOptions, setIngredientOptions] = useState<
    Ingredient[] | null
  >(null);

  const [ingredientList, setIngredientList] = useState<
    Record<
      string,
      {
        ingredient: Ingredient;
        numberOfservings: number;
        servingSize: number | null;
      }
    >
  >({});

  const [ingredientIdList, setIngredientIdList] = useState<string[]>([]);
  const [servingSize, setServingSize] = useState(0);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [price, setPrice] = useState(0);

  const searchIngredient = async () => {
    const { data, error } = await supabase
      .from("ingredients")
      .select()
      .eq("name", ingredientSearch);
    if (error) console.log(error);
    setIngredientOptions(data);
  };

  const addIngredient = (
    index: number,
    numberOfservings: number,
    servingSize: number | null
  ) => {
    if (ingredientOptions == null) return;
    setIngredientList({
      ...ingredientList,
      [ingredientOptions[index].id]: {
        ingredient: ingredientOptions[index],
        numberOfservings: numberOfservings,
        servingSize: servingSize,
      },
    });

    setIngredientIdList([...ingredientIdList, ingredientOptions[index].id]);
    console.log(index);
  };

  useEffect(() => {
    setIngredientOptions([]);
    setIngredientSearch("");
  }, [addingIngredient]);

  const removeIngredient = (ingredientId: string) => {};

  return (
    <div className="p-6 pb-[4rem] flex flex-col relative h-[calc(100vh-5rem)] gap-3">
      <div className="flex justify-between items-center bg-red-200">
        <h1 className="text-3xl font-bold">Add Recipe</h1>
        {isForm && (
          <button onClick={() => setShowAddForm(false)} className="flex2">
            <IoIosClose className="text-5xl flex" />
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col overflow-scroll pb-6">
        {pageNumber == 1 && (
          <Page1 />
        )}
        {pageNumber == 2 && (
          <Page2 />
        )}
        {pageNumber == 3 && (
          <Page3 />
        )}
      </div>

      <div className="w-full flex justify-between absolute bottom-0 left-0 px-6 pb-6 bg-red-200 h-16">
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
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2 absolute bottom-0 right-0 m-6"
          >
            Add Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default AddRecipeForm;

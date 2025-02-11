"use client";

import Dropdown from "@/components/dropdown/dropdown";
import AddIngredientInfo from "@/components/ingredientInfo/addIngredientInfo";
import EditIngredientInfo from "@/components/ingredientInfo/editIngredientInfo";
import IngredientInfo from "@/components/ingredientInfo/ingredientInfo";
import { Ingredient } from "@/types";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

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
      <div className="">
        {pageNumber == 1 && (
          <form className="space-y-3 flex-1">
            <div>
              <label className="block font-semibold">Recipe Name</label>
              <input
                type="text"
                placeholder="Lettuce"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md w-full p-2 border-gray-300"
                required
              />
            </div>
            <div className="flex h-full">
              <div className="w-full flex items-center">
                <label className="block font-semibold flex-1">Servings</label>
                <input
                  type="number"
                  value={servingSize === 0 ? "" : servingSize}
                  onChange={(e) =>
                    setServingSize(
                      e.target.value === "" ? 0 : Number(e.target.value)
                    )
                  }
                  placeholder="10"
                  className="border rounded-md w-1/3 p-2 border-gray-300"
                  required
                />
              </div>
            </div>
          </form>
        )}
        {pageNumber == 2 && (
          <form className="space-y-3 flex-1">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="block font-semibold text-2xl">Ingredients</h2>
                {addingIngredient ? (
                  <button
                    type="button"
                    className="bg-negativeRed text-white font-semibold rounded-md px-4 py-2 w-[9.5rem]"
                    onClick={() => setAddingIngredient(false)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2 w-[9.5rem]"
                    onClick={() => setAddingIngredient(true)}
                  >
                    Add Ingredient
                  </button>
                )}
              </div>
            </div>
            {addingIngredient ? (
              <div className="space-y-3">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Lettuce"
                    value={ingredientSearch}
                    onChange={(e) => setIngredientSearch(e.target.value)}
                    className="border rounded-md w-full p-2 border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    className="bg-mainGreen px-3 text-white font-semibold"
                    onClick={searchIngredient}
                  >
                    Search
                  </button>
                </div>
                <div className="overflow-y-auto">
                  {ingredientOptions &&
                    ingredientOptions.map((ingredient, index) => (
                      <AddIngredientInfo
                        key={index}
                        index={index}
                        ingredient={ingredient}
                        addIngredient={addIngredient}
                        setAddingIngredient={setAddingIngredient}
                      />
                    ))}
                </div>
              </div>
            ) : Object.keys(ingredientList).length != 0 ? (
              Object.keys(ingredientList).map((ingredient) => (
                <EditIngredientInfo
                  ingredient={ingredientList[ingredient].ingredient}
                  numberOfServings={ingredientList[ingredient].numberOfservings}
                  servingSize={ingredientList[ingredient].servingSize}
                />
              ))
            ) : (
              <div>
                <h1>There are no ingredients yet.</h1>
              </div>
            )}
          </form>
        )}
        {pageNumber == 3 && (
          <form className="space-y-3 flex-1">
            <h1>Page 3</h1>
          </form>
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

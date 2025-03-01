import AddIngredientInfo from "@/components/ingredientInfo/addIngredientInfo";
import EditIngredientInfo from "@/components/ingredientInfo/editIngredientInfo";
import { Ingredient } from "@/types";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

type formProp = {
  ingredientList: Record<
    string,
    {
      ingredient: Ingredient;
      numberOfservings: number;
      servingSize: number | null;
    }
  >;
  setIngredientList: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          ingredient: Ingredient;
          numberOfservings: number;
          servingSize: number | null;
        }
      >
    >
  >;
  ingredientIdList: Object;
  setIngredientIdList: React.Dispatch<Object>;
};

function Page2({
  ingredientList,
  setIngredientList,
  ingredientIdList,
  setIngredientIdList,
}: formProp) {
  const [addingIngredient, setAddingIngredient] = useState(false);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [ingredientOptions, setIngredientOptions] = useState<
    Ingredient[] | null
  >(null);
  const supabase = createClient();

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

    setIngredientIdList({
      ...ingredientIdList,
      [ingredientOptions[index].id]: [numberOfservings, servingSize],
    });
    console.log(index);
  };

  useEffect(() => {
    setIngredientOptions([]);
    setIngredientSearch("");
  }, [addingIngredient]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
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
      {addingIngredient ? (
        <div className="space-y-3">
          <div className="flex">
            <input
              type="text"
              placeholder="Lettuce"
              value={ingredientSearch}
              onChange={(e) => {
                e.preventDefault();
                setIngredientSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchIngredient();
                }
              }}
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
        <div className="space-y-3">
          {Object.keys(ingredientList).map((ingredient) => (
            <EditIngredientInfo
              ingredient={ingredientList[ingredient].ingredient}
              numberOfServings={ingredientList[ingredient].numberOfservings}
              servingSize={ingredientList[ingredient].servingSize}
            />
          ))}
        </div>
      ) : (
        <div>
          <h1>There are no ingredients yet.</h1>
        </div>
      )}
    </div>
  );
}

export default Page2;

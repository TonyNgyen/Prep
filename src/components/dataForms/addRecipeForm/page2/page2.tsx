import EditIngredientInfo from "@/components/ingredientInfo/editIngredientInfo";
import React from "react";

type formProp = {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
};

function Page2() {
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
        <div className="space-y-3 bg-blue-200">
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

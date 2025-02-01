import Dropdown from "@/components/dropdown/dropdown";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

type formProp = {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
};

type Nutrition = {
  [key: string]: number;
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
  createdAt: Date;
};

type Recipe = {
  id: string;
  name: string;
  nutrition: Nutrition;
  ingredientsList: IngredientsList;
  howManyServings: number;
  pricePerServing?: number;
  howManyTimesUsed?: number;
};

type IngredientsList = {
  [key: string]: Ingredient;
};

function AddRecipeForm({ setShowAddForm, isForm }: formProp) {
  const [pageNumber, setPageNumber] = useState(1);
  const [addingIngredient, setAddingIngredient] = useState(false);

  const [name, setName] = useState("");
  const [ingredientsList, setIngredientList] = useState<IngredientsList>({});
  const [servingSize, setServingSize] = useState(0);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      // Reference to the user's ingredients subcollection
      const ingredientsRef = collection(db, "users", user.uid, "ingredients");

      const newIngredient = {
        name,
        nutrition: {
          calories,
          protein,
          carbs,
          fats: fat,
          sodium: { amount: sodium, unit: "mg" }, // Replace 0 with actual sodium value if available
        },
        servingSize,
        pricePerContainer: price,
        howManyTimesUsed: 0, // Default to 0 for a new ingredient
        createdAt: new Date().toISOString(), // Optional: Add a timestamp
      };

      // Add the ingredient document
      await addDoc(ingredientsRef, newIngredient);

      const newIngredient2 = {
        name,
        nutrition: {
          calories,
          protein,
          carbs,
          fats: fat,
          sodium: { amount: sodium, unit: "mg" }, // Replace 0 with actual sodium value if available
        },
        servingSize,
        pricePerContainer: price,
        createdAt: new Date().toISOString(), // Optional: Add a timestamp
      };

      const docRef = await addDoc(
        collection(db, "ingredients"),
        newIngredient2
      );

      alert("Ingredient added successfully!");

      // Clear form fields
      setName("");
      setServingSize(0);
      setCalories(0);
      setProtein(0);
      setCarbs(0);
      setFat(0);
      setPrice(0);
      setSodium(0);
    } catch (error) {
      console.error("Error adding ingredient: ", error);
    }
  };

  return (
    <div className="p-6 flex flex-col relative h-[calc(100vh-5rem)]">
      <div>
        <div className="flex justify-between mb-3 items-center">
          <h1 className="text-3xl font-bold">Add Recipe</h1>
          {isForm && (
            <button onClick={() => setShowAddForm(false)} className="flex2">
              <IoIosClose className="text-5xl flex" />
            </button>
          )}
        </div>
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
              <input
                type="text"
                placeholder="Lettuce"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md w-full p-2 border-gray-300"
                required
              />
            ) : (
              <div>Ingredient List</div>
            )}
          </form>
        )}
        {pageNumber == 3 && (
          <form className="space-y-3 flex-1">
            <h1>Page 3</h1>
          </form>
        )}
      </div>

      <div className="w-full flex justify-between absolute bottom-0 left-0 p-6">
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

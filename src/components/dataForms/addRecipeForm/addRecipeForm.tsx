import { auth, db } from "@/app/firebase";
import Dropdown from "@/components/dropdown/dropdown";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

type formProp = {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
};

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
  createdAt: Date;
};

type Recipe = {
  id: string;
  name: string;
  nutrition: Nutrition;
  ingredientsList: IngredientsList
  howManyServings: number;
  pricePerServing?: number;
  howManyTimesUsed?: number;
};

type IngredientsList = {
  [key: string]: Ingredient;
};

function AddRecipeForm({ setShowAddForm, isForm }: formProp) {
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
    <div className="p-6">
      <div className="flex justify-between mb-3 items-center">
        <h1 className="text-3xl font-bold">Add Recipe</h1>
        {isForm && (
          <button onClick={() => setShowAddForm(false)} className="flex2">
            <IoIosClose className="text-5xl flex" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
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
          <div className="w-full">
            <label className="block font-semibold">Servings</label>
            <input
              type="number"
              value={servingSize === 0 ? "" : servingSize}
              onChange={(e) =>
                setServingSize(
                  e.target.value === "" ? 0 : Number(e.target.value)
                )
              }
              placeholder="10"
              className="border border-r-0 rounded-l-md w-full p-2 border-gray-300"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;

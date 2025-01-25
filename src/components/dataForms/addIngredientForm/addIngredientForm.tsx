import { db } from "@/app/firebase";
import Dropdown from "@/components/dropdown/dropdown";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

type formProp = {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddIngredientForm({ setShowAddForm }: formProp) {
  const [name, setName] = useState("");
  const [servingSize, setServingSize] = useState(0);
  const [servingUnit, setServeringUnit] = useState("");
  const [servingsPerContainer, setServingsPerContainer] = useState(0);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [price, setPrice] = useState(0);

  const [dropping, setDropping] = useState(false);

  const handleDropdownChange = (selectedValue: string) => {
    console.log(selectedValue);
    setServeringUnit(selectedValue);
  };

  const options = [
    { value: "g", label: "Grams (g)" },
    { value: "oz", label: "Ounces (oz)" },
    { value: "c", label: "Cups (c)" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ingredientData = {
      name,
      servingSize,
      servingUnit,
      servingsPerContainer,
      calories,
      protein,
      carbs,
      fat,
      price,
    };

    try {
      const docRef = await addDoc(
        collection(db, "ingredients"),
        ingredientData
      );
      console.log("Document written with ID: ", docRef.id);

      // Reset the form
      setName("");
      setServingSize(0);
      setServeringUnit("");
      setServingsPerContainer(0);
      setCalories(0);
      setProtein(0);
      setCarbs(0);
      setFat(0);
      setPrice(0);

      alert("Ingredient added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add ingredient.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-3 items-center">
        <h1 className="text-3xl font-bold">Add Ingredient</h1>
        <button onClick={() => setShowAddForm(false)} className="flex">
          <IoIosClose className="text-5xl flex" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-semibold">Ingredient Name</label>
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
          <div className="w-1/2">
            <label className="block font-semibold">Serving Size</label>
            <input
              type="number"
              value={servingSize === 0 ? "" : servingSize}
              onChange={(e) =>
                setServingSize(
                  e.target.value === "" ? 0 : Number(e.target.value)
                )
              }
              placeholder="50"
              className="border border-r-0 rounded-l-md w-full p-2 border-gray-300"
              required
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <label className="block font-semibold">Serving Unit</label>
            <Dropdown
              options={options}
              defaultValue={options[0].label}
              onChange={handleDropdownChange}
              className={`${dropping ? " rounded-tr-md " : " rounded-r-md "}`}
              drop={dropping}
              onDropChange={setDropping}
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold">Servings Per Container</label>
          <input
            type="number"
            value={servingsPerContainer === 0 ? "" : servingsPerContainer}
            onChange={(e) =>
              setServingsPerContainer(
                e.target.value === "" ? 0 : Number(e.target.value)
              )
            }
            placeholder="50"
            className="border rounded-md w-full p-2 border-gray-300"
          />
        </div>
        <div>
          <label className="block font-semibold">Price Per Container</label>
          <input
            type="number"
            value={price === 0 ? "" : price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="50"
            className="border rounded-md w-full p-2 border-gray-300"
          />
        </div>
        <div>
          <label className="block font-semibold">Calories</label>
          <input
            type="number"
            value={calories === 0 ? "" : calories}
            onChange={(e) =>
              setCalories(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="50"
            className="border rounded-md w-full p-2 border-gray-300"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Protein (g)</label>
          <input
            type="number"
            value={protein === 0 ? "" : protein}
            onChange={(e) =>
              setProtein(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="50"
            className="border rounded-md w-full p-2 border-gray-300"
          />
        </div>
        <div>
          <label className="block font-semibold">Carbs (g)</label>
          <input
            type="number"
            value={carbs === 0 ? "" : carbs}
            onChange={(e) =>
              setCarbs(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="50"
            className="border rounded-md w-full p-2 border-gray-300"
          />
        </div>
        <div>
          <label className="block font-semibold">Fat (g)</label>
          <input
            type="number"
            value={fat === 0 ? "" : fat}
            onChange={(e) =>
              setFat(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="50"
            className="border rounded-md w-full p-2 border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
        >
          Add Ingredient
        </button>
      </form>
    </div>
  );
}

export default AddIngredientForm;

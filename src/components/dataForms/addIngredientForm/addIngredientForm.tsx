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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      calories,
      protein,
      carbs,
      fat,
    });

    setName("");
    setCalories(0);
    setProtein(0);
    setCarbs(0);
    setFat(0);
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
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Serving Size</label>
          <input
            type="number"
            value={servingSize === 0 ? "" : servingSize}
            onChange={(e) =>
              setServingSize(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="50"
            className="border rounded w-full p-2"
            required
          />
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
            className="border rounded w-full p-2"
            required
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
            className="border rounded w-full p-2"
            required
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
            className="border rounded w-full p-2"
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
            className="border rounded w-full p-2"
            required
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
            className="border rounded w-full p-2"
            required
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
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-mainGreen text-white font-semibold rounded px-4 py-2"
        >
          Add Ingredient
        </button>
      </form>
    </div>
  );
}

export default AddIngredientForm;

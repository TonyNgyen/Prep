import Dropdown from "@/components/dropdown/dropdown";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

type formProp = {
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
};

type FormDataType = {
  name: string;
  servingSize: number | null;
  servingUnit: string;
  servingsPerContainer: number | null;
  pricePerContainer: number | null;
  calories: number | null;
  protein: number | null;
  totalFat: number | null;
  saturatedFat: number | null;
  polyunsaturatedFat: number | null;
  monounsaturatedFat: number | null;
  transFat: number | null;
  cholesterol: number | null;
  sodium: number | null;
  potassium: number | null;
  totalCarbohydrates: number | null;
  sugars: number | null;
  addedSugars: number | null;
  sugarAlcohols: number | null;
  vitaminA: number | null;
  vitaminC: number | null;
  vitaminD: number | null;
  calcium: number | null;
  iron: number | null;
};

function AddIngredientForm({ setShowAddForm, isForm }: formProp) {
  const supabase = createClient();
  const options = [
    { value: "g", label: "Grams (g)" },
    { value: "oz", label: "Ounces (oz)" },
    { value: "c", label: "Cups (c)" },
  ];

  const required = ["servingsPerContainer", "calories"];

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    servingSize: null,
    servingUnit: "g",
    servingsPerContainer: null,
    pricePerContainer: null,
    calories: null,
    protein: null,
    totalFat: null,
    saturatedFat: null,
    polyunsaturatedFat: null,
    monounsaturatedFat: null,
    transFat: null,
    cholesterol: null,
    sodium: null,
    potassium: null,
    totalCarbohydrates: null,
    sugars: null,
    addedSugars: null,
    sugarAlcohols: null,
    vitaminA: null,
    vitaminC: null,
    vitaminD: null,
    calcium: null,
    iron: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0 : value, // Convert numbers
    }));
  };

  const testArray = async () => {
    // const { data, error } = await supabase.rpc("addrow", {
    //   rowid: 10,
    //   inputarray: ["item1", "item2", "item3"],
    // });
    // if (error) {
    //   console.error("Error:", error);
    // } else {
    //   console.log("Updated textArray:", data);
    // }
    // const { data, error } = await supabase.rpc("append_to_array", {
    //   rowid: 3,
    //   new_item: "item 69",
    // });
    // if (error) {
    //   console.error("Error:", error);
    // } else {
    //   console.log("Updated textArray:", data);
    // }
    // const { data: userData, error: userError } = await supabase.auth.getUser(); // Get the current user
    // if (userError || !userData.user) {
    //   console.error(
    //     "Error fetching user:",
    //     userError?.message || "No user found"
    //   );
    //   return;
    // }
    // const userId = userData.user.id; // Get the current user's ID
    // const { data: insertData, error } = await supabase.rpc(
    //   "append_ingredient_user",
    //   {
    //     userid: userId,
    //     ingredientid: "ingredientId",
    //   }
    // );
    // console.log(insertData);
  };

  const [dropping, setDropping] = useState(false);

  const handleDropdownChange = (selectedValue: string) => {
    setFormData((prev) => ({ ...prev, servingUnit: selectedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);

    // Insert the new ingredient into the "ingredients" table
    const { data, error } = await supabase
      .from("ingredients")
      .insert([formData])
      .select();

    if (error) {
      console.error("Error inserting data:", error.message);
      return; // Exit if there's an error
    }

    console.log("Inserted data:", data);

    try {
      const ingredientId = data?.[0]?.id; // Get the UUID of the newly inserted ingredient
      const { data: userData, error: userError } =
        await supabase.auth.getUser(); // Get the current user

      if (userError || !userData.user) {
        console.error(
          "Error fetching user:",
          userError?.message || "No user found"
        );
        return;
      }

      const userId = userData.user.id; // Get the current user's ID

      const { data: insertData, error } = await supabase.rpc(
        "append_ingredient_user",
        {
          userid: userId,
          ingredientid: ingredientId,
        }
      );

      console.log(insertData);
    } catch (error) {
      console.error("Error adding ingredient to user:", error);
    }
  };

  const test = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data.user !== null) console.log(data.user.id);
  };

  return (
    <div className="p-6 pb-[6.5rem]">
      <div className="flex justify-between mb-3 items-center">
        <h1 className="text-3xl font-bold">Add Ingredient</h1>
        {isForm && (
          <button onClick={() => setShowAddForm(false)} className="flex2">
            <IoIosClose className="text-5xl flex" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-semibold">Ingredient Name</label>
          <input
            type="text"
            name="name"
            placeholder="Lettuce"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-md w-full p-2 border-gray-300"
            required
          />
        </div>
        <div className="flex h-full">
          <div className="w-1/2">
            <label className="block font-semibold">Serving Size</label>
            <input
              type="number"
              name="servingSize"
              value={formData.servingSize || ""}
              onChange={handleChange}
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
        {[
          { label: "Servings Per Container", key: "servingsPerContainer" },
          { label: "Price Per Container", key: "pricePerContainer" },
          { label: "Calories", key: "calories" },
          { label: "Protein (g)", key: "protein" },
          { label: "Total Fat (g)", key: "totalFat" },
          { label: "Saturated Fat (g)", key: "saturatedFat" },
          { label: "Polyunsaturated Fat (g)", key: "polyunsaturatedFat" },
          { label: "Monounsaturated Fat (g)", key: "monounsaturatedFat" },
          { label: "Trans Fat (g)", key: "transFat" },
          { label: "Cholesterol (mg)", key: "cholesterol" },
          { label: "Sodium (mg)", key: "sodium" },
          { label: "Potassium (mg)", key: "potassium" },
          { label: "Total Carbohydrates (g)", key: "totalCarbohydrates" },
          { label: "Sugars (g)", key: "sugars" },
          { label: "Added Sugars (g)", key: "addedSugars" },
          { label: "Sugar Alcohols (g)", key: "sugarAlcohols" },
          { label: "Vitamin A (%)", key: "vitaminA" },
          { label: "Vitamin C (%)", key: "vitaminC" },
          { label: "Vitamin D (%)", key: "vitaminD" },
          { label: "Calcium (%)", key: "calcium" },
          { label: "Iron (%)", key: "iron" },
        ].map(({ label, key }) => (
          <div key={key} className="flex w-full items-center">
            <label className="block font-semibold flex-1">{label}</label>
            {required.includes(key) ? (
              <input
                type="number"
                name={key}
                step="0.01"
                min="0"
                value={formData[key as keyof FormDataType] || ""}
                onChange={handleChange}
                placeholder="Required"
                className="border rounded-md w-1/3 p-2 border-mainGreen"
                required
              />
            ) : (
              <input
                type="number"
                name={key}
                step="0.01"
                min="0"
                value={formData[key as keyof FormDataType] || ""}
                onChange={handleChange}
                placeholder="Optional"
                className="border rounded-md w-1/3 p-2 border-gray-300"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
        >
          Add Ingredient
        </button>
        <button
          type="button"
          className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
          onClick={() => testArray()}
        >
          Test
        </button>
      </form>
    </div>
  );
}

export default AddIngredientForm;

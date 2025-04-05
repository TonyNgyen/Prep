import Dropdown from "@/components/dropdown/dropdown";
import DropdownInverse from "@/components/dropdown/dropdownInverse";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";

type formProp = {
  setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>;
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

function toCamelCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
}

function AddIngredientForm({ setShowAddForm, isForm }: formProp) {
  const supabase = createClient();
  const router = useRouter();
  const options = [
    { value: "g", label: "Grams (g)" },
    { value: "oz", label: "Ounces (oz)" },
    { value: "c", label: "Cups (c)" },
    { value: "x", label: "Unit (x)" },
  ];

  const extraOptions = [
    { value: "g", label: "g" },
    { value: "mg", label: "mg" },
    { value: "percent", label: "%" },
  ];

  const required = ["servingsPerContainer", "calories"];

  const [dropping, setDropping] = useState(false);
  const [extraDropping, setExtraDropping] = useState(false);

  const [addingExtraNutrition, setAddingExtraNutrition] =
    useState<boolean>(false);
  const [allExtraNutrition, setAllExtraNutrition] = useState<
    Record<
      string,
      {
        key: string;
        label: string | null;
        unit: string | null;
        value: number | null;
      }
    >
  >({});

  const [extraNutritionValues, setExtraNutritionValues] = useState<{
    label: string | null;
    unit: string | null;
    value: number | null;
    key: string | undefined;
  }>({
    label: null,
    unit: "g",
    value: null,
    key: undefined,
  });

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
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  };

  const handleExtraNutrition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setExtraNutritionValues((prev) => {
      const updatedLabel = name === "label" ? value : prev.label;
      const updatedKey = updatedLabel ? toCamelCase(updatedLabel) : prev.key;

      return {
        ...prev,
        [name]: type === "number" ? Number(value) || 0 : value,
        key: updatedKey,
      };
    });
  };

  const addExtraNutrition = () => {
    if (extraNutritionValues.key) {
      setAllExtraNutrition((prev) => ({
        ...prev,
        [extraNutritionValues.key as string]: {
          key: extraNutritionValues.key as string,
          label: extraNutritionValues.label,
          unit: extraNutritionValues.unit,
          value: extraNutritionValues.value,
        },
      }));
    }
    setExtraNutritionValues({
      label: null,
      unit: "g",
      value: null,
      key: undefined,
    });
    setAddingExtraNutrition(false);
  };

  const handleDropdownChange = (selectedValue: string) => {
    setFormData((prev) => ({ ...prev, servingUnit: selectedValue }));
  };

  const handleExtraDropdown = (selectedValue: string) => {
    setExtraNutritionValues((prev) => ({
      ...prev,
      unit: selectedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      extraNutrition: allExtraNutrition,
    };
    const { data, error } = await supabase
      .from("ingredients")
      .insert([submissionData])
      .select();

    if (error) {
      console.error("Error inserting data:", error.message);
      return;
    }

    try {
      const ingredientId = data?.[0]?.id;
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      const userId = userData?.user?.id;

      const { data: insertData, error: insertError } = await supabase.rpc(
        "append_ingredient_user",
        {
          userid: userId,
          ingredientid: ingredientId,
        }
      );
      if (insertError) {
        console.error("Error inserting data 2:", insertError.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error adding ingredient to user:", error);
    }
  };

  return (
    <div className="p-6 pb-[6.5rem]">
      <div className="flex justify-between mb-3 items-center">
        <h1 className="text-3xl font-bold">Add Ingredient</h1>
        {isForm && setShowAddForm && (
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
          { label: "Protein (g)", key: "protein" },
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
                value={formData[key as keyof FormDataType] ?? ""}
                onChange={handleChange}
                placeholder="Optional"
                className="border rounded-md w-1/3 p-2 border-gray-300"
              />
            )}
          </div>
        ))}
        {Object.values(allExtraNutrition).map(({ label, unit, value, key }) => (
          <div key={key} className="flex w-full items-center">
            <label className="block font-semibold flex-1">{label}</label>
            <input
              type="number"
              name={key}
              step="0.01"
              min="0"
              value={allExtraNutrition[key].value || ""}
              onChange={handleChange}
              placeholder="Optional"
              className="border rounded-md w-1/3 p-2 border-gray-300"
            />
          </div>
        ))}
        {addingExtraNutrition && (
          <div
            key={"extra"}
            className="flex w-full items-center justify-between"
          >
            <div className="flex w-[60%]">
              <input
                type="text"
                name="label"
                value={extraNutritionValues["label"] || ""}
                onChange={handleExtraNutrition}
                placeholder="Nutritional Label"
                className="border p-2 w-11/12 border-mainGreen border-r-0 rounded-l-md"
                required
              />
              <DropdownInverse
                options={extraOptions}
                defaultValue={extraOptions[0].label}
                onChange={handleExtraDropdown}
                className={`${
                  extraDropping ? " rounded-tr-md " : " rounded-r-md "
                } h-full min-w-[4.5rem]`}
                drop={extraDropping}
                onDropChange={setExtraDropping}
              />
            </div>

            <input
              type="number"
              name="value"
              step="0.01"
              min="0"
              value={extraNutritionValues["value"] || ""}
              onChange={handleExtraNutrition}
              placeholder="Value"
              className="border rounded-md w-1/3 p-2 border-mainGreen"
              required
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {addingExtraNutrition ? (
            <div className="flex gap-2 pt-12">
              <button
                type="button"
                className="bg-mainGreen text-white font-semibold rounded-md px-4 py-3 flex-1"
                onClick={() => addExtraNutrition()}
              >
                Add Nutrition
              </button>
              <div
                className="bg-negativeRed text-white font-semibold rounded-md px-4 py-3 flex-1 text-center"
                onClick={() => setAddingExtraNutrition(false)}
              >
                Cancel
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="bg-white text-mainGreen border-2 border-mainGreen font-semibold rounded-md px-4 py-3"
                onClick={() => setAddingExtraNutrition(true)}
              >
                Add Nutritional Information
              </button>
              <button
                type="submit"
                className="bg-mainGreen text-white font-semibold rounded-md px-4 py-3"
              >
                Add Ingredient
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddIngredientForm;

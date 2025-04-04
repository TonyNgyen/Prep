import Dropdown from "@/components/dropdown/dropdown";
import React from "react";

type formProp = {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setNumberOfServings: React.Dispatch<React.SetStateAction<number>>;
  setServingSize: React.Dispatch<React.SetStateAction<number>>;
  setServingUnit: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  numberOfServings: number;
  servingSize: number;
  servingUnit: string;
};

function Page1({
  setName,
  setNumberOfServings,
  setServingSize,
  setServingUnit,
  name,
  numberOfServings,
  servingSize,
  servingUnit,
}: formProp) {
  const handleDropdownSelection = (selectedValue: string) => {
    setServingUnit(selectedValue);
  };
  const options = [
    { value: "g", label: "Grams (g)" },
    { value: "oz", label: "Ounces (oz)" },
    { value: "c", label: "Cups (c)" },
    { value: "x", label: "Unit (x)" },
  ];
  return (
    <form className="space-y-3">
      <div>
        <label className="block font-semibold text-2xl">Recipe Name</label>
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
            value={numberOfServings === 0 ? "" : numberOfServings}
            onChange={(e) =>
              setNumberOfServings(
                e.target.value === "" ? 0 : Number(e.target.value)
              )
            }
            placeholder="10"
            className="border rounded-md w-1/3 p-2 border-gray-300"
            required
          />
        </div>
      </div>
      <div className="flex h-full">
        <div className="w-full flex items-center">
          <label className="block font-semibold flex-1">Serving Size</label>
          <input
            type="number"
            value={servingSize === 0 ? "" : servingSize}
            onChange={(e) =>
              setServingSize(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="10"
            className="border rounded-md w-1/3 p-2 border-gray-300"
            required
          />
        </div>
      </div>
      <div className="flex h-full">
        <div className="w-full flex items-center">
          <label className="block font-semibold flex-1">Serving Unit</label>
          <Dropdown
            options={options}
            defaultValue={options[0].label}
            onChange={handleDropdownSelection}
            className="rounded-md"
          />
        </div>
      </div>
    </form>
  );
}

export default Page1;

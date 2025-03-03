import React from "react";

type formProp = {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setTotalServingSize: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  totalServingSize: number;
};

function Page1({ setName, setTotalServingSize, name, totalServingSize }: formProp) {
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
            value={totalServingSize === 0 ? "" : totalServingSize}
            onChange={(e) =>
              setTotalServingSize(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="10"
            className="border rounded-md w-1/3 p-2 border-gray-300"
            required
          />
        </div>
      </div>
    </form>
  );
}

export default Page1;

import React from "react";

function Page1() {
  return (
    <form className="space-y-3 flex-1">
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
    </form>
  );
}

export default Page1;

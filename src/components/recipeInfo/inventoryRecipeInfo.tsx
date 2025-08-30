"use client";

import { InventoryRecipe } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type AddInventoryRecipeInfoProps = {
  recipe: InventoryRecipe;
};

function AddInventoryRecipeInfo({ recipe }: AddInventoryRecipeInfoProps) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="shadow-md">
      <div
        className={`bg-blue-900 text-white p-3 rounded-md flex items-center justify-between ${
          dropdown && "rounded-b-none"
        }`}
      >
        <h1 className="text-2xl font-semibold">{recipe.name}</h1>

        {dropdown ? (
          <IoMdArrowDropup
            className="text-4xl"
            onClick={() => setDropdown(false)}
          />
        ) : (
          <IoMdArrowDropdown
            className="text-4xl"
            onClick={() => setDropdown(true)}
          />
        )}
      </div>
      {dropdown && (
        <div className="bg-white rounded-b-md p-3">
          <div className="flex justify-between text-2xl font-bold">
            <h1>Total Amount:</h1>{" "}
            <h1>
              {recipe.totalAmount}
              {recipe.unit}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddInventoryRecipeInfo;

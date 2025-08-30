"use client";

import { InventoryIngredient } from "@/types";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type InventoryIngredientInfoProps = {
  ingredient: InventoryIngredient;
};

function InventoryIngredientInfo({ ingredient }: InventoryIngredientInfoProps) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="shadow-md">
      <div
        className={`bg-gray-800 text-white p-3 rounded-md flex items-center justify-between ${
          dropdown && "rounded-b-none"
        }`}
      >
        <h1 className="text-2xl font-semibold">{ingredient.name}</h1>

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
              {ingredient.totalAmount}
              {ingredient.unit}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryIngredientInfo;

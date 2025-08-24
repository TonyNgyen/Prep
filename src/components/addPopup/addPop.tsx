"use client";

import Link from "next/link";
import React from "react";

type AddPopupProps = {
  setAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddPopup({ setAddPopup }: AddPopupProps) {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 bg-white w-80 h-32 p-2 border-4 border-gray-800 rounded-md">
      <Link
        href="/log/add"
        className="flex items-center"
        onClick={() => setAddPopup(false)}
      >
        <button className=" font-semibold text-lg">Log Food</button>
      </Link>
      <Link
        href="/recipes/add"
        className="flex items-center"
        onClick={() => setAddPopup(false)}
      >
        <button className=" font-semibold text-lg">Add Recipe</button>
      </Link>
      <Link
        href="/ingredients/add"
        className="flex items-center"
        onClick={() => setAddPopup(false)}
      >
        <button className=" font-semibold text-lg">Add Ingredient</button>
      </Link>
      <Link
        href="/inventory/add"
        className="flex items-center"
        onClick={() => setAddPopup(false)}
      >
        <button className=" font-semibold text-lg">Add Inventory</button>
      </Link>
    </div>
  );
}

export default AddPopup;

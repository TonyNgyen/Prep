import Link from "next/link";
import React from "react";

function AddPopup() {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 bg-white w-80 h-32 p-2 border-4 border-mainGreen rounded-md">
      <Link href="/food/log" className="flex items-center">
        <button className=" font-semibold text-lg">Log Food</button>
      </Link>
      <Link href="/recipes/add" className="flex items-center">
        <button className=" font-semibold text-lg">Add Recipes</button>
      </Link>
      <Link href="/ingredients/add" className="flex items-center">
        <button className=" font-semibold text-lg">Add Ingredients</button>
      </Link>
      <Link href="/inventory/add" className="flex items-center">
        <button className=" font-semibold text-lg">Add Inventory</button>
      </Link>
    </div>
  );
}

export default AddPopup;

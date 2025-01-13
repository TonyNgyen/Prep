import React from "react";

function AddPopup() {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 bg-white w-80 h-32 p-2 border-4 border-mainGreen rounded-md">
      <div className="flex items-center font-semibold text-lg">Log Food</div>
      <div className="flex items-center font-semibold text-lg">Add Recipes</div>
      <div className="flex items-center font-semibold text-lg">Add Ingredients</div>
      <div className="flex items-center font-semibold text-lg">Add Inventory</div>
    </div>
  );
}

export default AddPopup;

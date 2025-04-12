"use client";

import {
  deleteMealFromMealHistory,
  deleteMealFromNutritionalHistory,
  searchIngredientById,
} from "@/lib/data";
import { IngredientMeal, RecipeMeal } from "@/types";
import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

type EditSpecificFoodProps = {
  food: IngredientMeal | RecipeMeal;
  meal: string;
  date: string;
};

function EditSpecificFood({ food, meal, date }: EditSpecificFoodProps) {
  const [dropdown, setDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(food.totalAmount);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setDropdown(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved amount:", amount);
  };

  return (
    <div className="flex justify-between items-center relative">
      {/* <div className="bg-blue-300 p-4" onClick={() => console.log(food)}>
        Print food
      </div>
      <div
        className="bg-blue-300 p-4"
        onClick={() => deleteMealFromNutritionalHistory(date, meal, food)}
      >
        Test
      </div> */}
      <div className="flex flex-col">
        <h2 className="text-md font-medium">{food.name}</h2>
        {isEditing ? (
          <div className="flex items-center gap-1 mt-1">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              onBlur={handleSave}
              className="w-10 border rounded px-2 py-1 text-sm text-gray-600"
              autoFocus
            />
            <span className="text-sm text-gray-600">
              {food.unit === "x"
                ? amount > 1
                  ? "Servings"
                  : "Serving"
                : food.unit}
            </span>
          </div>
        ) : (
          <h3 className="text-sm text-gray-600">
            {amount}{" "}
            {food.unit === "x"
              ? amount > 1
                ? "Servings"
                : "Serving"
              : food.unit}
          </h3>
        )}
      </div>

      {!isEditing && (
        <div className="relative" ref={dropdownRef}>
          <HiOutlineDotsVertical
            className="text-xl cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          />
          {dropdown && (
            <div className="absolute right-0 top-6 bg-white border rounded-md shadow-md z-10 min-w-[120px] text-sm">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 hover:bg-gray-100 text-left"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDropdown(false);
                  deleteMealFromMealHistory(date, meal, food.id);
                  deleteMealFromNutritionalHistory(date, meal, food);
                }}
                className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EditSpecificFood;

"use client";

import LogFoodForm from "@/components/dataForms/logFoodForm/logFoodForm";
import { SpecificMealEntry } from "@/types";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import SpecificFood from "./specificFood/specificFood";
import EditSpecificFood from "./editSpecificFood/editSpecificFood";

type SpecificMealProps = {
  meal: string;
  mealInformation: SpecificMealEntry | null;
  date: string;
};

function SpecificMeal({ meal, mealInformation, date }: SpecificMealProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  if (showAddForm) {
    return (
      <LogFoodForm
        dateInput={date}
        mealInput={meal}
        isForm={true}
        setShowAddForm={setShowAddForm}
      />
    );
  } else {
    return (
      <div className="shadow-sm">
        <div className="bg-gray-300 p-2 flex justify-between items-center rounded-t-md">
          <h1 className="font-semibold text-xl">
            {meal.charAt(0).toUpperCase() + meal.slice(1)}
          </h1>
          {!editing && (
            <FaEdit className="text-xl" onClick={() => setEditing(true)} />
          )}
        </div>

        <div className="bg-gray-300 bg-opacity-50 rounded-b-md">
          {mealInformation && Object.keys(mealInformation.food).length != 0 && (
            <div className="p-2 space-y-3">
              {!editing
                ? Object.values(mealInformation.food).map((food) => (
                    <SpecificFood food={food} />
                  ))
                : Object.values(mealInformation.food).map((food) => (
                    <EditSpecificFood food={food} meal={meal} date={date} />
                  ))}
            </div>
          )}
          {!editing ? (
            <div
              className={`p-2 font-semibold text-md cursor-pointer ${
                mealInformation ? "border-t-2 border-gray-300" : ""
              }`}
              onClick={() => setShowAddForm(true)}
            >
              Add Food
            </div>
          ) : (
            <div className="flex justify-center px-4 gap-2 py-2">
              <button
                className="bg-negativeRed flex-1 rounded-md py-[0.2rem] text-white font-semibold"
                onClick={() => setEditing(false)}
                type="button"
              >
                Cancel
              </button>{" "}
              <button className="bg-gray-800 flex-1 rounded-md py-[0.2rem] text-white font-semibold">
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SpecificMeal;

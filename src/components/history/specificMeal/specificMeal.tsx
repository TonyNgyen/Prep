"use client";

import LogFoodForm from "@/components/dataForms/logFoodForm/logFoodForm";
import { SpecificMealEntry } from "@/types";
import React, { useState } from "react";

type SpecificMealProps = {
  meal: string;
  mealInformation: SpecificMealEntry | null;
  date: string;
};

function SpecificMeal({ meal, mealInformation, date }: SpecificMealProps) {
  const [showAddForm, setShowAddForm] = useState(false);
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
        <h1 className="bg-gray-300 p-2 font-semibold text-xl">
          {meal.charAt(0).toUpperCase() + meal.slice(1)}
        </h1>
        <div className="bg-gray-200">
          {mealInformation && (
            <div className="p-2 space-y-3">
              {Object.values(mealInformation.food).map((food) => (
                <div>
                  <div>
                    <h2 className="text-md">{food.name}</h2>
                    <h3 className="text-sm">
                      {food.totalAmount}
                      {food.unit}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            className="p-2 font-semibold text-md"
            onClick={() => setShowAddForm(true)}
          >
            Add Food
          </div>
        </div>
      </div>
    );
  }
}

export default SpecificMeal;

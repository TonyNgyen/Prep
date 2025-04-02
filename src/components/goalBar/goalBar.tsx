import React from "react";

type GoalBarProp = {
  nutrition: string;
  goal: number;
  current: number;
};

function GoalBar({ nutrition, goal, current }: GoalBarProp) {
  const nutritionLabel =
    nutrition === "totalCarbohydrates" ? "Carbs" : nutrition;
  return (
    <div className="flex justify-between bg-white px-3 py-2 rounded-md shadow-md items-center">
      <div>
        <h1 className="text-2xl">
          {nutritionLabel.charAt(0).toUpperCase() + nutritionLabel.slice(1)}
        </h1>
        <h2 className="text-sm text-gray-500">Today: {current}</h2>
      </div>

      <h1 className="text-2xl">{goal}</h1>
    </div>
  );
}

export default GoalBar;

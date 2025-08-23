import React from "react";

type GoalBarProp = {
  nutrition: string;
  goal: number;
  current: number;
  color?: string;
};

function GoalBar({ nutrition, goal, current, color }: GoalBarProp) {
  const nutritionLabel =
    nutrition === "totalCarbohydrates" ? "Carbs" : nutrition;
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className=" bg-white px-3 py-2 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">
            {nutritionLabel.charAt(0).toUpperCase() + nutritionLabel.slice(1)}
          </h1>
          <h2 className="text-sm text-gray-500">Today: {current ?? 0}</h2>
        </div>
        <h1 className="text-2xl">{goal}</h1>
      </div>
      <div
        className="h-2 rounded-md transition-all duration-300 mt-2"
        style={{ width: `${percentage}%`, backgroundColor: color || "#4ade80" }}
      ></div>
    </div>
  );
}

export default GoalBar;

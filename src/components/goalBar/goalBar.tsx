import React from "react";

type GoalBarProp = {
  nutrition: string;
  goal: number;
};

function GoalBar({ nutrition, goal }: GoalBarProp) {
  const nutritionLabel =
    nutrition === "totalCarbohydrates" ? "Carbs" : nutrition;
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl">
        {nutritionLabel.charAt(0).toUpperCase() + nutritionLabel.slice(1)}
      </h1>
      <h1 className="text-2xl">{goal}</h1>
    </div>
  );
}

export default GoalBar;

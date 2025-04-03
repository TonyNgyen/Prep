import React, { useState } from "react";

type EditGoalBarProp = {
  nutrition: string;
  goal: number;
  current: number;
  onGoalChange: (value: number) => void; // Function to update goals
};

function EditGoalBar({
  nutrition,
  goal,
  current,
  onGoalChange,
}: EditGoalBarProp) {
  const [currentValue, setCurrentValue] = useState<number>(goal);
  const nutritionLabel =
    nutrition === "totalCarbohydrates" ? "Carbs" : nutrition;
  return (
    <div className="flex justify-between bg-white px-3 py-2 rounded-md shadow-md items-center">
      <div>
        <h1 className="text-2xl">
          {nutritionLabel.charAt(0).toUpperCase() + nutritionLabel.slice(1)}
        </h1>
        <h2 className="text-sm text-gray-500">Today: {current ?? 0}</h2>
      </div>

      <input
        type="number"
        name={nutrition}
        step="0.01"
        min="0"
        value={currentValue}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          setCurrentValue(newValue);
          onGoalChange(newValue);
        }}
        placeholder="100"
        className="border rounded-md w-1/4 p-2 border-gray-300 text-2xl text-right"
      />
    </div>
  );
}

export default EditGoalBar;

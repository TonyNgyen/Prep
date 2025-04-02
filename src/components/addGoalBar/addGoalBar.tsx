import React, { useState } from "react";

type AddGoalBarProps = {
  onGoalChange: (nutrition: string, value: number) => void;
};

function AddGoalBar({ onGoalChange }: AddGoalBarProps) {
  const [nutrition, setNutrition] = useState<string>("");
  const [goal, setGoal] = useState<number | null>(null);

  return (
    <div className="flex justify-between bg-white px-3 py-2 rounded-md shadow-md items-center">
      <input
        type="text"
        value={nutrition}
        onChange={(e) => setNutrition(e.target.value)}
        placeholder="Enter nutrition name"
        className="border rounded-md w-1/3 p-2 border-gray-300 text-xl"
      />

      <input
        type="number"
        step="0.01"
        min="0"
        value={goal ?? ""}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          setGoal(newValue);
          if (nutrition.trim()) {
            onGoalChange(nutrition, newValue);
          }
        }}
        placeholder="Enter goal"
        className="border rounded-md w-1/4 p-2 border-gray-300 text-2xl text-right"
      />
    </div>
  );
}

export default AddGoalBar;

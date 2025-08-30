import React, { useState } from "react";

type AddGoalBarProps = {
  onGoalChange: (nutrition: string, value: number, color: string) => void;
};

function AddGoalBar({ onGoalChange }: AddGoalBarProps) {
  const [nutrition, setNutrition] = useState<string>("");
  const [goal, setGoal] = useState<number | null>(null);
  const [color, setColor] = useState<string>("#4ade80");

  return (
    <div className="flex justify-between bg-white px-3 py-2 rounded-md shadow-md items-center gap-2">
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
            onGoalChange(nutrition, newValue, color);
          }
        }}
        placeholder="Enter goal"
        className="border rounded-md w-1/4 p-2 border-gray-300 text-2xl text-right"
      />

      <input
        type="color"
        value={color}
        onChange={(e) => {
          const newColor = e.target.value;
          setColor(newColor);
          if (nutrition.trim() && goal !== null) {
            onGoalChange(nutrition, goal, newColor);
          }
        }}
        className="w-12 h-12 p-1 border rounded-md cursor-pointer"
      />
    </div>
  );
}

export default AddGoalBar;

import React from "react";

type GoalDisplayProps = {
  nutritionalValue: string;
  goal: number;
  current: number;
};

function GoalDisplay({ nutritionalValue, goal, current }: GoalDisplayProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">{goal}</h2>
          <h3 className="text-lg">Goal</h3>
        </div>
        <h3 className="text-4xl">-</h3>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">{current}</h2>
          <h3 className="text-lg">Food</h3>
        </div>
        <h3 className="text-3xl">=</h3>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">{goal - current}</h2>
          <h3 className="text-lg">Remaining</h3>
        </div>
      </div>
    </div>
  );
}

export default GoalDisplay;

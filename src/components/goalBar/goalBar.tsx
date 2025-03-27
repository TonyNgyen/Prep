import React from "react";

type GoalBarProp = {
  nutrition: string;
  goal: number;
};

function GoalBar({ nutrition, goal }: GoalBarProp) {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl">{nutrition}</h1>
      <h1 className="text-2xl">{goal}</h1>
    </div>
  );
}

export default GoalBar;

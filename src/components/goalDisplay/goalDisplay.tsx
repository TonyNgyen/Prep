import React from "react";

type GoalDisplayProps = {
  nutritionalValue: string;
  goal: number;
  current: number;
};

function GoalDisplay({ nutritionalValue, goal, current }: GoalDisplayProps) {
  return (
    <div>
      {nutritionalValue} | {goal} | {current}
    </div>
  );
}

export default GoalDisplay;

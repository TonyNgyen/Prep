import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface NutritionalChartProps {
  current: number;
  goal: number;
  color?: string;
}

const NutritionalChart: React.FC<NutritionalChartProps> = ({
  current,
  goal,
  color = "#0B6E4F"
}) => {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

  return (
    <CircularProgressbar
      value={percentage}
      text={current.toString()}
      styles={buildStyles({
        textColor: "#374151",
        pathColor: color,
        trailColor: "#E5E7EB",
      })}
    />
  );
};

export default NutritionalChart;

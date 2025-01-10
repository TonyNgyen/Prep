import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface NutritionalChartProps {
  current: number;
  goal: number;
}

const NutritionalChart: React.FC<NutritionalChartProps> = ({ current, goal }) => {
  const percentage = (current / goal) * 100; // Calculate percentage correctly
  return (
    <CircularProgressbar
      value={percentage}
      text={current.toString()} // Rounded percentage for better display
      styles={buildStyles({
        textColor: "#0B6E4F",
        pathColor: "#0B6E4F",
      })}
    />
  );
};

export default NutritionalChart;

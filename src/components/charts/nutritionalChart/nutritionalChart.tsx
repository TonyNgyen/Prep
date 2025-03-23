import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface NutritionalChartProps {
  current: number;
  goal: number;
}

const NutritionalChart: React.FC<NutritionalChartProps> = ({
  current,
  goal,
}) => {
  const percentage = (current / goal) * 100;
  return (
    <CircularProgressbar
      value={percentage}
      text={current.toString()}
      styles={buildStyles({
        textColor: "#0B6E4F",
        pathColor: "#0B6E4F",
        // pathColor: `rgba(11, 110, 79, ${percentage / 100})`,
      })}
    />
  );
};

export default NutritionalChart;

import React from "react";
import "./test.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
const data = [
  { date: "01/01/2024", weight: 140 },
  { date: "01/02/2024", weight: 139.8 },
  { date: "01/03/2024", weight: 139.5 },
  { date: "01/04/2024", weight: 139.7 },
  { date: "01/05/2024", weight: 139.2 },
  { date: "01/06/2024", weight: 138.9 },
  { date: "01/07/2024", weight: 138.6 },
  { date: "01/08/2024", weight: 138.8 },
  { date: "01/09/2024", weight: 138.3 },
  { date: "01/10/2024", weight: 138.0 },
];

interface weightHistoryChartProps {
  weightHistory: object;
  weightGoal: number;
}

const WeightHistoryChart: React.FC<weightHistoryChartProps> = ({
  weightHistory,
  weightGoal,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          left: -15,
          right: 0,
        }}
      >
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => tick.substring(1, 5)}
          interval={"preserveStartEnd"}
          tick={{ fontSize: 14 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={6}
          domain={["dataMin - 4", "dataMax + 4"]}
          interval={"preserveEnd"}
          padding={{ top: 12, bottom: 12 }}
          tick={{ fontSize: 14 }}
          tickMargin={15}
        />
        <ReferenceLine
          y={138}
          stroke="#3182BD"
          strokeDasharray="10 8"
          strokeWidth={2.5}
        />
        <CartesianGrid strokeDasharray="0" vertical={false} />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#0B6E4F"
          strokeWidth={4}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightHistoryChart;

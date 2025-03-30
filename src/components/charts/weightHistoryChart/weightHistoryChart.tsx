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
import { subWeeks, format } from "date-fns";

interface WeightHistory {
  date: string;
  weight: number;
}

interface WeightHistoryChartProps {
  weightHistory: WeightHistory[];
  weightGoal: number;
}

const getLast4Weeks = (weightHistory: WeightHistory[]) => {
  const today = new Date();
  const last4Weeks = [3, 2, 1, 0].map((weeksAgo) =>
    format(subWeeks(today, weeksAgo), "yyyy-MM-dd")
  );

  const startDate = last4Weeks[0];
  const endDate = last4Weeks[last4Weeks.length - 1];
  const allDates = [];
  let currentDate = new Date(startDate);
  const endDateObj = new Date(endDate);

  while (currentDate <= endDateObj) {
    allDates.push(format(currentDate, "yyyy-MM-dd"));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  allDates.push(format(currentDate, "yyyy-MM-dd"));

  allDates.forEach((date) => {
    if (!weightHistory.some((entry) => entry.date === date)) {
      const previousEntry = weightHistory
        .filter((entry) => entry.date < date)
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .pop();

      let weightToUse;

      if (previousEntry) {
        weightToUse = previousEntry.weight;
      } else {
        const futureEntry = weightHistory
          .filter((entry) => entry.date > date)
          .sort((a, b) => (a.date < b.date ? -1 : 1))
          .shift();

        if (futureEntry) {
          weightToUse = futureEntry.weight;
        }
      }

      if (weightToUse !== undefined) {
        weightHistory.push({
          date,
          weight: weightToUse,
        });
      }
    }
  });

  return last4Weeks;
};

const WeightHistoryChart: React.FC<WeightHistoryChartProps> = ({
  weightHistory,
  weightGoal,
}) => {
  const last4Weeks = getLast4Weeks(weightHistory);
  const startDate = last4Weeks[0];
  const endDate = last4Weeks[last4Weeks.length - 1];

  const filteredWeightHistory = weightHistory.filter(
    (entry) => entry.date >= startDate && entry.date <= endDate
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={filteredWeightHistory}
        margin={{ left: -15, right: 19 }}
      >
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(tick) => tick.substring(5, 10)}
          interval={"preserveStartEnd"}
          ticks={last4Weeks}
          tick={{ fontSize: 14 }}
          domain={[last4Weeks[0], last4Weeks[last4Weeks.length - 1]]}
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
          y={weightGoal}
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

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

  // Calculate the last 4 weeks
  const last4Weeks = [3, 2, 1, 0].map((weeksAgo) =>
    format(subWeeks(today, weeksAgo), "yyyy-MM-dd")
  );

  // Get the start and end dates for the range of last4Weeks
  const startDate = last4Weeks[0];
  const endDate = last4Weeks[last4Weeks.length - 1];

  // Generate all dates between startDate and endDate
  const allDates = [];
  let currentDate = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Adjust the loop to include the last date
  while (currentDate <= endDateObj) {
    allDates.push(format(currentDate, "yyyy-MM-dd"));
    currentDate.setDate(currentDate.getDate() + 1); // Move to next day
  }

  allDates.push(format(currentDate, "yyyy-MM-dd"));

  // Ensure weightHistory includes all dates in the range from startDate to endDate
  allDates.forEach((date) => {
    // If the date is missing in weightHistory, add it
    if (!weightHistory.some((entry) => entry.date === date)) {
      const previousEntry = weightHistory
        .filter((entry) => entry.date < date) // Filter entries before the current date
        .sort((a, b) => (a.date > b.date ? 1 : -1)) // Sort by date (oldest to newest)
        .pop(); // Get the most recent entry before the current date

      // If a previous entry exists, add the missing date with the previous entry's weight
      if (previousEntry) {
        weightHistory.push({
          date,
          weight: previousEntry.weight,
        });
      }
    }
  });

  // Return the original last4Weeks array
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
  console.log(filteredWeightHistory);
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
          tickLine={true}
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

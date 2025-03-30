"use client";

import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import WeightHistoryChart from "@/components/charts/weightHistoryChart/weightHistoryChart";
import Link from "next/link";
import DailyMacroProgress from "../charts/dailyMacroProgress/dailyMacroProgess";
import {
  fetchAllWeightHistory,
  fetchCurrentWeightGoal,
  fetchWeightGoals,
} from "@/lib/data";
import { format } from "date-fns";

interface Nutrition {
  current: number;
  goal: number;
}

interface WeightHistory {
  date: string;
  weight: number;
}

function Dashboard() {
  const [weightHistory, setWeightHistory] = useState<WeightHistory[] | null>(
    null
  );
  const [currentWeightGoal, setCurrentWeightGoal] = useState<number | null>(
    null
  );
  const today = format(new Date(), "yyyy-MM-dd");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchHistory = await fetchAllWeightHistory();
      const formattedWeightHistory = Object.entries(fetchHistory).map(
        ([date, weight]) => ({
          date,
          weight: Number(weight),
        })
      );
      const weightGoal = await fetchCurrentWeightGoal();
      setWeightHistory(formattedWeightHistory);
      setCurrentWeightGoal(weightGoal);
    };
    fetchData();
  }, []);

  return (
    <div className="px-4">
      <div className="pt-10 flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Hello User</h1>
        <Link href="/account" className="flex items-center">
          <button className="">
            <MdAccountCircle className="h-[45px] w-[45px]" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href="/log/add"
          className="bg-mainGreen p-4 text-white rounded-lg shadow-md flex items-center justify-between"
        >
          <h1 className="text-2xl font-bold">Log Food</h1>
        </Link>
        <DailyMacroProgress />
        <div className="bg-white p-4 text-black rounded-lg shadow-md flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Weight History</h1>
          <div
            onClick={() => console.log(today)}
            className="bg-red-200 p-4"
          ></div>
          <h2>
            Current Weight:
            {weightHistory
              ? weightHistory.find((entry) => entry.date === today)?.weight ??
                "No data"
              : "Loading..."}
          </h2>

          <h2>Goal: {currentWeightGoal}</h2>
          {weightHistory && currentWeightGoal && (
            <div className="h-[225px]">
              <WeightHistoryChart
                weightGoal={currentWeightGoal}
                weightHistory={weightHistory}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

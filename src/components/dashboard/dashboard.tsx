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
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);
  const today = format(new Date(), "yyyy-MM-dd");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (weightHistory && weightHistory.length > 0) {
      setCurrentWeight(
        weightHistory.find((entry) => entry.date === today)?.weight ?? null
      );
    }
  }, [weightHistory, today]);

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
          className="bg-gray-800 p-4 text-white rounded-lg shadow-md flex items-center justify-between"
        >
          <h1 className="text-2xl font-bold">Log Food</h1>
        </Link>
        <div className="flex flex-col md:flex-row gap-4">
          <DailyMacroProgress />
          <div className="bg-white p-4 text-black rounded-lg shadow-md flex flex-col lg:w-1/3">
            <h1 className="text-2xl font-bold mb-4">Weight History</h1>
            {weightHistory && currentWeightGoal ? (
              <div className="">
                <div className="flex gap-4 text-sm">
                  <h2>Current Weight: {currentWeight ?? "No data"}</h2>
                  <h2>Goal: {currentWeightGoal}</h2>
                </div>
                <div className="h-[225px]">
                  <WeightHistoryChart
                    weightGoal={currentWeightGoal}
                    weightHistory={weightHistory}
                  />
                </div>
              </div>
            ) : (
              <div>No Data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

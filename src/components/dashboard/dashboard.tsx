"use client";

import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import WeightHistoryChart from "@/components/charts/weightHistoryChart/weightHistoryChart";
import { FaPlusSquare } from "react-icons/fa";
import Link from "next/link";
import DailyMacroProgress from "../charts/dailyMacroProgress/dailyMacroProgess";

interface Nutrition {
  current: number;
  goal: number;
}

interface WeightHistory {
  date: string;
  weight: number;
}

interface WeightHistoryData {
  weightHistory: WeightHistory[];
  weightGoal: number;
}

function Dashboard() {
  const [weightHistoryData, setWeightHistoryData] =
    useState<WeightHistoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWeightHistoryData({
      weightHistory: [
        { date: "2025-02-29", weight: 142.0 },
        { date: "2025-03-01", weight: 141.8 },
        { date: "2025-03-02", weight: 141.5 },
        { date: "2025-03-03", weight: 141.3 },
        { date: "2025-03-04", weight: 141.0 },
        { date: "2025-03-05", weight: 140.8 },
        { date: "2025-03-06", weight: 140.5 },
        { date: "2025-03-07", weight: 140.2 },
        { date: "2025-03-08", weight: 140.0 },
        { date: "2025-03-09", weight: 139.8 },
        { date: "2025-03-10", weight: 139.5 },
        { date: "2025-03-11", weight: 139.3 },
        { date: "2025-03-12", weight: 139.1 },
        { date: "2025-03-13", weight: 138.9 },
        { date: "2025-03-14", weight: 138.7 },
        { date: "2025-03-15", weight: 138.5 },
        { date: "2025-03-16", weight: 138.3 },
        { date: "2025-03-17", weight: 138.1 },
        { date: "2025-03-18", weight: 138.0 },
        { date: "2025-03-19", weight: 137.8 },
        { date: "2025-03-20", weight: 137.6 },
        { date: "2025-03-21", weight: 137.4 },
        { date: "2025-03-22", weight: 137.3 },
        { date: "2025-03-23", weight: 137.1 },
        { date: "2025-03-24", weight: 137.0 },
      ],

      weightGoal: 136.5, // Updated realistic goal
    });
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
            onClick={() => console.log(weightHistoryData?.weightHistory)}
            className="bg-red-200 p-4"
          ></div>
          {weightHistoryData && (
            <div className="h-[225px]">
              <WeightHistoryChart
                weightGoal={weightHistoryData.weightGoal}
                weightHistory={weightHistoryData.weightHistory}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

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
      ],
      weightGoal: 139,
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

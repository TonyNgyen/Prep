"use client";
import NavBar from "@/components/navbar/navbar";
import { MdAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import NutritionalChart from "@/components/charts/nutritionalChart/nutritionalChart";

interface Nutrition {
  current: number;
  goal: number;
}

interface NutritionalData {
  [key: string]: Nutrition;
}

export default function Home() {
  const [user, setUser] = useState(true);
  const [nutritionalData, setNutritionalData] =
    useState<NutritionalData | null>(null);
  useEffect(() => {
    setNutritionalData({
      calories: { current: 1000, goal: 2000 },
      protein: { current: 40, goal: 100 },
      carbs: { current: 200, goal: 300 },
    });
  }, []);
  if (!user) {
    return <div>Not Logged In</div>;
  } else {
    return (
      <div className="px-4">
        <div className="pt-10 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Hello User</h1>
          <a href="/account" className="flex items-center">
            <button className="">
              <MdAccountCircle className="h-[45px] w-[45px]" />
            </button>
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-mainGreen p-4 text-white rounded-lg shadow-md">
            Log Meal
          </div>
          <div className="bg-white p-4 text-black rounded-lg shadow-md flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Daily Nutrition Log</h1>
            {nutritionalData && (
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(nutritionalData).map((nutrition) => (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <NutritionalChart
                      current={nutritionalData[nutrition].current}
                      goal={nutritionalData[nutrition].goal}
                    />
                    <h2 className="text-xl font-semibold">
                      {nutrition[0].toUpperCase()}
                      {nutrition.slice(1)}
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white p-4 text-black rounded-lg shadow-md flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Weight History</h1>
          </div>
        </div>
      </div>
    );
  }
}

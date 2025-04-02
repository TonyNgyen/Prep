import { NutritionFacts } from "@/types";
import React, { useEffect, useState } from "react";
import NutritionalChart from "../nutritionalChart/nutritionalChart";
import { fetchDayNutritionalHistory, fetchNutritionalGoals } from "@/lib/data";
import { flattenNutritionFacts } from "@/lib/functions";

function DailyMacroProgress() {
  const today = new Date().toISOString().split("T")[0];
  const [nutritionalData, setNutritionalData] = useState<NutritionFacts | null>(
    null
  );
  const [goals, setGoals] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetch = async () => {
      let fetchNutrition = await fetchDayNutritionalHistory(today);
      fetchNutrition = flattenNutritionFacts(fetchNutrition);
      console.log(fetchNutrition);
      setNutritionalData(fetchNutrition);

      const fetchNutritionalGoal = await fetchNutritionalGoals();
      setGoals(fetchNutritionalGoal);
    };
    fetch();
  }, []);

  if (!nutritionalData) {
    return (
      <div className="bg-white p-4 text-black rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold">Daily Nutrition Log</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 text-black rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold mb-3">Daily Nutrition Log</h1>
      <div className="overflow-x-auto">
        <div className="flex gap-2 flex-nowrap">
          {(Object.keys(goals) as Array<keyof NutritionFacts>).map(
            (nutrition) => {
              const nutritionLabel =
                nutrition === "totalCarbohydrates" ? "Carbs" : nutrition;

              return (
                <div
                  className="flex flex-col items-center justify-center gap-2 min-w-[calc((100%-1rem)/3)]"
                  key={nutrition}
                >
                  <NutritionalChart
                    current={(nutritionalData[nutrition] as number) ?? 0}
                    goal={goals[nutrition] ?? 0}
                  />
                  <h3 className="text-lg font-semibold">
                    {nutritionLabel.charAt(0).toUpperCase() +
                      nutritionLabel.slice(1)}
                  </h3>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyMacroProgress;

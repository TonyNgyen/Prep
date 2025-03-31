"use client";

import { fetchMealHistory } from "@/lib/data";
import React, { useEffect, useState } from "react";
import SpecificMeal from "../specificMeal/specificMeal";

type MealHistoryProps = {
  date: string;
};

function MealHistory({ date }: MealHistoryProps) {
  const [mealHistory, setMealHistory] = useState();
  const [currentDay, setCurrentDay] = useState();
  const meals = ["breakfast", "lunch", "dinner", "snack", "miscellaneous"];
  useEffect(() => {
    const fetch = async () => {
      const fetchHistory = await fetchMealHistory();
      setMealHistory(fetchHistory);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (mealHistory) {
      setCurrentDay(mealHistory[date]);
    }
  }, [mealHistory, date]);

  return (
    <div>
      {currentDay ? (
        <div className="flex flex-col gap-y-3">
          {meals.map((meal) => (
            <SpecificMeal
              key={meal}
              meal={meal}
              mealInformation={currentDay[meal]}
              date={date}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {meals.map((meal) => (
            <SpecificMeal
              key={meal}
              meal={meal}
              mealInformation={null}
              date={date}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MealHistory;

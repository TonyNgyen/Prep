"use client";

import React, { useEffect, useState } from "react";
import MealHistory from "../mealHistory/mealHistory";
import NutritionalHistory from "../nutritionalHistory/nutritionalHistory";
import { fetchNutritionalGoals, fetchAllNutritionalHistory } from "@/lib/data";
import DatePicker from "@/components/datePicker/datePicker";
import Dropdown from "@/components/dropdown/dropdown";
import GoalDisplay from "@/components/goalDisplay/goalDisplay";

function LogContainer() {
  const [nutritionalHistory, setNutritionalHistory] = useState<
    Record<string, any>
  >({});
  const [date, setDate] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [nutritionalValue, setNutritionalValue] = useState<string>("calories");
  const [goals, setGoals] = useState();

  const options = [
    { value: "calories", label: "Calories" },
    { value: "protein", label: "Protein" },
    { value: "totalCarbohydrates", label: "Carbs" },
    // { value: "more", label: "More" },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      const fetchNutritional = await fetchAllNutritionalHistory();
      setNutritionalHistory(fetchNutritional);
      const fetchGoal = await fetchNutritionalGoals();
      setGoals(fetchGoal);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (nutritionalHistory) {
      setDates(Object.keys(nutritionalHistory));
    }
    const today = new Date().toISOString().split("T")[0];
    if (!(today in nutritionalHistory)) {
      dates.push(today);
      setDate(today);
    }
  }, [nutritionalHistory]);

  return (
    <div className="space-y-4">
      <DatePicker dates={dates} date={date} setDate={setDate} />
      <div className="space-y-2">
        <Dropdown
          options={options}
          onChange={setNutritionalValue}
          defaultValue="Calories"
        />
        <GoalDisplay
          nutritionalValue={nutritionalValue}
          goal={goals?.[nutritionalValue] ?? 0}
          current={nutritionalHistory?.[date]?.[nutritionalValue] ?? 0}
        />
      </div>

      <MealHistory date={date} />
      {/* <NutritionalHistory date={date} /> */}
    </div>
  );
}

export default LogContainer;

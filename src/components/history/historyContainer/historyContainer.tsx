"use client";

import React, { useEffect, useState } from "react";
import MealHistory from "../mealHistory/mealHistory";
import NutritionalHistory from "../nutritionalHistory/nutritionalHistory";
import { fetchNutritionalGoals, fetchAllNutritionalHistory } from "@/lib/data";
import DatePicker from "@/components/datePicker/datePicker";
import Dropdown from "@/components/dropdown/dropdown";
import GoalDisplay from "@/components/goalDisplay/goalDisplay";
import { IoTodayOutline } from "react-icons/io5";
import { sumDailyNutrition } from "@/lib/functions";
import { NutritionFacts } from "@/types"; // Assuming you have this

function LogContainer() {
  const [nutritionalHistory, setNutritionalHistory] = useState<
    Record<string, Record<string, NutritionFacts>>
  >({});
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [dates, setDates] = useState<string[]>([]);
  const [nutritionalValue, setNutritionalValue] = useState<string>("calories");
  const [currentNutritionalValue, setCurrentNutritionalValue] =
    useState<number>(0);
  const [goals, setGoals] = useState<Record<string, number>>({});

  const options = [
    { value: "calories", label: "Calories" },
    { value: "protein", label: "Protein" },
    { value: "totalCarbohydrates", label: "Carbs" },
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
    if (!nutritionalHistory || !date || !(date in nutritionalHistory)) {
      setCurrentNutritionalValue(0);
      return;
    }

    const dailyEntry = nutritionalHistory[date];
    const dailyTotal = sumDailyNutrition(dailyEntry);
    const value = dailyTotal[nutritionalValue as keyof NutritionFacts];

    if (typeof value === "number") {
      setCurrentNutritionalValue(value);
    } else {
      setCurrentNutritionalValue(0);
    }
  }, [date, nutritionalValue, nutritionalHistory]);

  useEffect(() => {
    if (nutritionalHistory) {
      const allDates = Object.keys(nutritionalHistory);
      const today = new Date().toLocaleDateString("en-CA");

      if (!allDates.includes(today)) {
        allDates.push(today);
      }

      setDates(allDates);
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
          className="rounded-md"
        />
        <GoalDisplay
          nutritionalValue={nutritionalValue}
          goal={goals?.[nutritionalValue] ?? 0}
          current={currentNutritionalValue ?? 0}
        />
      </div>

      <MealHistory date={date} />
      {/* <NutritionalHistory date={date} /> */}
    </div>
  );
}

export default LogContainer;

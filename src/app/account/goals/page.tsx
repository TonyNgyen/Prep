"use client";

import AddGoalBar from "@/components/addGoalBar/addGoalBar";
import EditGoalBar from "@/components/editGoalBar/editGoalBar";
import GoalBar from "@/components/goalBar/goalBar";
import PageHeader from "@/components/pageHeader/pageHeader";
import {
  fetchDayNutritionalHistory,
  fetchNutritionalGoals,
  updateNutritionalGoals,
} from "@/lib/data";
import { NutritionFacts } from "@/types";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

type Goal = {
  goal: number;
  color: string;
};

function GoalsPage() {
  const [nutritionalGoals, setNutritionalGoals] = useState<
    Record<string, Goal>
  >({});
  const [originalGoals, setOriginalGoals] = useState<Record<string, Goal>>({});
  const [editing, setEditing] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [newGoal, setNewGoal] = useState<{
    nutrition: string;
    value: number;
    color: string;
  }>({
    nutrition: "",
    value: 0,
    color: "",
  });
  const [nutritionalHistory, setNutritionalHistory] = useState<NutritionFacts>({
    calories: 0,
    protein: 0,
    totalFat: 0,
    saturatedFat: 0,
    polyunsaturatedFat: 0,
    monounsaturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    totalCarbohydrates: 0,
    dietaryFiber: 0,
    totalSugars: 0,
    addedSugars: 0,
    sugarAlcohols: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    extraNutrition: {},
  });

  const today = format(new Date(), "yyyy-MM-dd");
  const test = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetch = async () => {
      const fetchGoals = await fetchNutritionalGoals();
      setNutritionalGoals(fetchGoals);
      setOriginalGoals(fetchGoals);
      const fetchHistory = await fetchDayNutritionalHistory(today);
      setNutritionalHistory(fetchHistory);
    };
    fetch();
  }, []);

  const handleCancel = () => {
    setNutritionalGoals(originalGoals);
    setEditing(false);
    setUpdate(false);
  };

  const handleAddGoal = async () => {
    if (newGoal.nutrition.trim() && newGoal.value > 0) {
      const updatedGoals: Record<string, Goal> = {
        ...nutritionalGoals,
        [newGoal.nutrition]: { goal: newGoal.value, color: newGoal.color },
      };
      const success = await updateNutritionalGoals(updatedGoals);
      if (success) {
        setNutritionalGoals(updatedGoals);
        setOriginalGoals(updatedGoals);
        setAdding(false);
        setNewGoal({ nutrition: "", value: 0, color: "" });
      }
    }
  };

  const handleUpdateGoals = async () => {
    if (update) {
      const success = await updateNutritionalGoals(nutritionalGoals);
      if (success) {
        setOriginalGoals(nutritionalGoals);
        setEditing(false);
        setUpdate(false);
      }
    }
  };

  return (
    <div className="p-6 pb-[6.5rem]">
      <PageHeader>Goals</PageHeader>
      <div className="flex gap-2">
        {editing ? (
          <>
            <button
              type="button"
              className={`p-2 px-4 rounded-md font-semibold text-lg ${
                update
                  ? "bg-gray-800 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              onClick={handleUpdateGoals}
              disabled={!update}
            >
              Update
            </button>
            <button
              type="button"
              className="bg-negativeRed text-white p-2 px-4 rounded-md font-semibold text-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : adding ? (
          <>
            <button
              type="button"
              className={`p-2 px-4 rounded-md font-semibold text-lg ${
                newGoal.nutrition.trim() && newGoal.value > 0
                  ? "bg-gray-800 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              onClick={handleAddGoal}
              disabled={!newGoal.nutrition.trim() || newGoal.value <= 0}
            >
              Add Goal
            </button>
            <button
              type="button"
              className="bg-negativeRed text-white p-2 px-4 rounded-md font-semibold text-lg"
              onClick={() => setAdding(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="bg-gray-800 text-white p-2 px-4 rounded-md font-semibold text-lg"
            onClick={() => setAdding(true)}
          >
            Add
          </button>
        )}

        {!editing && !adding && (
          <button
            type="button"
            className="bg-gray-800 text-white p-2 px-4 rounded-md font-semibold text-lg"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {adding && (
          <AddGoalBar
            onGoalChange={(nutrition, value, color) =>
              setNewGoal({ nutrition, value, color })
            }
          />
        )}
        {!editing
          ? Object.entries(nutritionalGoals).map(([key, value]) => (
              <GoalBar
                nutrition={key}
                goal={value.goal}
                current={
                  nutritionalHistory[key as keyof NutritionFacts] as number
                }
                color={value.color}
              />
            ))
          : Object.entries(nutritionalGoals).map(([key, value]) => (
              <EditGoalBar
                nutrition={key}
                goal={value.goal}
                current={
                  nutritionalHistory[key as keyof NutritionFacts] as number
                }
                onGoalChange={(newValue: number) => {
                  setNutritionalGoals((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], goal: newValue },
                  }));
                  setUpdate(true);
                }}
              />
            ))}
      </div>
    </div>
  );
}

export default GoalsPage;

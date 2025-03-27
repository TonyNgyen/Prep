"use client";

import GoalBar from "@/components/goalBar/goalBar";
import PageHeader from "@/components/pageHeader/pageHeader";
import { fetchNutritionalGoals, updateGoals } from "@/lib/data";
import React, { useEffect, useState } from "react";

function GoalsPage() {
  const [nutritionalGoals, setNutritionalGoals] = useState<
    Record<string, number>
  >({});
  useEffect(() => {
    const fetch = async () => {
      const fetchGoals = await fetchNutritionalGoals();
      console.log(fetchGoals);
      setNutritionalGoals(fetchGoals);
    };
    fetch();
  }, []);
  return (
    <div className="p-6 pb-[6.5rem]">
      <PageHeader>Goals</PageHeader>
      <div className="flex flex-col gap-4">
        {Object.entries(nutritionalGoals).map(([key, value]) => {
          return <GoalBar nutrition={key} goal={value} />;
        })}
      </div>
    </div>
  );
}

export default GoalsPage;

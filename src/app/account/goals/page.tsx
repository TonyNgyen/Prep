"use client";

import PageHeader from "@/components/pageHeader/pageHeader";
import { fetchGoals, updateGoals } from "@/lib/data";
import React from "react";

function GoalsPage() {
  return (
    <div className="p-6 pb-[6.5rem]">
      <PageHeader>Goals</PageHeader>
      <div
        className="p-2 bg-purple-200"
        onClick={() => updateGoals({ calories: 120 })}
      >
        Fetch Goals
      </div>
    </div>
  );
}

export default GoalsPage;

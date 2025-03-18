"use client";

import PageHeader from "@/components/pageHeader/pageHeader";
import { fetchGoals } from "@/lib/data";
import React from "react";

function GoalsPage() {
  return (
    <div>
      <PageHeader>Goals</PageHeader>
      <div className="p-2 bg-purple-200" onClick={() => fetchGoals()}>
        Fetch Goals
      </div>
    </div>
  );
}

export default GoalsPage;

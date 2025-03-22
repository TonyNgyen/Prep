"use client";

import LogFoodForm from "@/components/dataForms/logFoodForm/logFoodForm";

function LogFoodPage() {
  const today = new Date().toISOString().split("T")[0];
  return <LogFoodForm dateInput={today} mealInput={null} isForm={false} />;
}

export default LogFoodPage;

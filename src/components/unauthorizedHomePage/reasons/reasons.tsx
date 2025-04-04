import React from "react";
import ReasonCard from "./reasonCard";

function Reasons() {
  const reasons = [
    { title: "Time-Saving Recipes", description: "Quick and easy meals perfect for busy schedules" },
    { title: "Customizable Meal Plans", description: "Tailor your meal prep to your dietary needs and preferences" },
    { title: "Shopping List Generator", description: "Automatically create grocery lists based on your meal plan" },
  ];
  return (
    <div>
      <h1 className="text-center text-3xl font-bold tracking-wide mb-8">
        Why Choose <span className="text-mainGreen">Prep?</span>
      </h1>
      <div className="flex flex-col gap-5 px-5">
        {reasons.map((reason) => (
          <ReasonCard key={reason.title} title={reason.title} description={reason.description} />
        ))}
      </div>
    </div>
  );
}

export default Reasons;

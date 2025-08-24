import React from "react";
import ReasonCard from "./reasonCard";

function Reasons() {
  const reasons = [
    {
      title: "Track Your Nutrition",
      description:
        "Easily monitor the nutritional value of your meals with detailed insights",
    },
    {
      title: "Personalized Meal Plans",
      description:
        "Create meal plans tailored to your dietary goals and preferences",
    },
    {
      title: "Smart Ingredient Management",
      description: "Manage your ingredients to ensure nothing goes to waste",
    },
  ];

  return (
    <div>
      <h1 className="text-center text-3xl font-bold tracking-wide mb-8">
        Why Choose <span className="text-gray-800">Prep?</span>
      </h1>
      <div className="flex flex-col gap-5 px-5 md:flex-row md:items-center md:justify-center">
        {reasons.map((reason) => (
          <ReasonCard
            key={reason.title}
            title={reason.title}
            description={reason.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Reasons;

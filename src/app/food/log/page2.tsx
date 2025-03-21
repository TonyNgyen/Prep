import PageHeader from "@/components/pageHeader/pageHeader";
import { InventoryIngredient, InventoryRecipe, NutritionFacts } from "@/types";
import React from "react";

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

const NUTRITIONAL_KEYS = {
  calories: "Calories",
  protein: "Protein",
  totalFat: "Total Fat",
  saturatedFat: "Saturated Fat",
  polyunsaturatedFat: "Polyunsaturated Fat",
  monounsaturatedFat: "Monounsaturated Fat",
  transFat: "Trans Fat",
  cholesterol: "Cholesterol",
  sodium: "Sodium",
  potassium: "Potassium",
  totalCarbohydrates: "Total Carbohydrates",
  sugars: "Sugars",
  addedSugars: "Added Sugars",
  sugarAlcohols: "Sugar Alcohols",
  vitaminA: "Vitamin A",
  vitaminC: "Vitamin C",
  vitaminD: "Vitamin D",
  calcium: "Calcium",
  iron: "Iron",
};

const NUTRITIONAL_UNITS: Record<string, string> = {
  calories: "kcal",
  protein: "g",
  totalFat: "g",
  saturatedFat: "g",
  polyunsaturatedFat: "g",
  monounsaturatedFat: "g",
  transFat: "g",
  cholesterol: "mg",
  sodium: "mg",
  potassium: "mg",
  totalCarbohydrates: "g",
  sugars: "g",
  addedSugars: "g",
  sugarAlcohols: "g",
  vitaminA: "%",
  vitaminC: "%",
  vitaminD: "%",
  calcium: "%",
  iron: "%",
};

type PageProps = {
  nutrition: NutritionFacts;
  logFood: ItemsToAdd;
  inventory: ItemsToAdd;
};

function Page2({ nutrition, logFood, inventory }: PageProps) {
  return (
    <div className="">

      <div className="mb-10">
        <PageHeader>Food To Log</PageHeader>
        {Object.values(logFood).length ? (
          <div className="space-y-2">
            {Object.values(logFood).map((food) => {
              if (food.type == "ingredient") {
                return (
                  <div
                    key={food.id}
                    className="bg-mainGreen p-3 rounded-md font-semibold text-lg text-white"
                  >
                    {food.name}
                  </div>
                );
              } else {
                return (
                  <div
                    key={food.id}
                    className="bg-blue-900 p-3 rounded-md font-semibold text-lg text-white"
                  >
                    {food.name}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div>Please add food to log</div>
        )}
      </div>

      <div>
        <PageHeader>Nutrition For Food</PageHeader>
        <div className="border-mainGreen border-[3px] p-3 rounded-md">
          <div className="space-y-2">
            {(
              Object.keys(NUTRITIONAL_KEYS) as Array<
                keyof typeof NUTRITIONAL_KEYS
              >
            ).map((key) => {
              const value = Number(nutrition[key].toFixed(2));

              if (value === null || value === undefined) return null;

              const unit = NUTRITIONAL_UNITS[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between text-lg"
                >
                  <span>{NUTRITIONAL_KEYS[key]}</span>
                  <span>
                    {value}
                    {unit}
                  </span>
                </div>
              );
            })}
            {Object.keys(nutrition.extraNutrition).map((key) => {
              const value = Number(
                nutrition.extraNutrition[key].value.toFixed(2)
              );

              if (value === null || value === undefined) return null;

              let unit;
              if (nutrition.extraNutrition[key].unit == "percent") {
                unit = "%";
              } else {
                unit = nutrition.extraNutrition[key].unit;
              }

              return (
                <div
                  key={key}
                  className="flex items-center justify-between text-lg"
                >
                  <span>{nutrition.extraNutrition[key].label}</span>
                  <span>
                    {value}
                    {unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2;

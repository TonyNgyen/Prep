import { NutritionFacts } from "@/types";

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
} as const;

const addNutrition = (
  nutrition1: NutritionFacts,
  nutrition2: NutritionFacts
) => {
  Object.keys(NUTRITIONAL_KEYS).map((nutritionalKey) => {
    const key = nutritionalKey as keyof NutritionFacts;

    if (key === "extraNutrition") return;

    const nutritionalValue = (nutrition2[key] as number | null) ?? 0;

    nutrition1[key] += nutritionalValue;
  });
  Object.keys(nutrition2.extraNutrition).map((key) => {
    const extraNutrition = nutrition2.extraNutrition[key];

    if (!nutrition1.extraNutrition[key]) {
      nutrition1.extraNutrition[key] = { ...extraNutrition, value: 0 };
    }
    nutrition1.extraNutrition[key].value += extraNutrition.value;
  });
  return nutrition1;
};

const flattenNutritionFacts = (nutritionFacts: NutritionFacts): Record<string, number> => {
  const { extraNutrition, ...baseFacts } = nutritionFacts;

  const extraFacts = Object.fromEntries(
    Object.entries(extraNutrition).map(([key, value]) => [key, value.value])
  );

  return {
    ...baseFacts,
    ...extraFacts,
  };
}


export { addNutrition, flattenNutritionFacts };

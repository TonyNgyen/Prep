import { addNutrition } from "@/lib/functions";
import { NutritionFacts } from "@/types";

describe("Add nutritrional values", () => {
  it("Add two nutritional values", () => {
    const nutritionFacts1: NutritionFacts = {
      calories: 250,
      protein: 15,
      totalFat: 10,
      saturatedFat: 3,
      polyunsaturatedFat: 2,
      monounsaturatedFat: 4,
      transFat: 0,
      cholesterol: 30,
      sodium: 200,
      potassium: 300,
      totalCarbohydrates: 20,
      sugars: 5,
      addedSugars: 2,
      sugarAlcohols: 0,
      vitaminA: 10,
      vitaminC: 15,
      vitaminD: 5,
      calcium: 100,
      iron: 8,
      extraNutrition: {
        omega3: { key: "omega3", label: "Omega-3", unit: "mg", value: 250 },
        fiber: { key: "fiber", label: "Dietary Fiber", unit: "g", value: 4 },
      },
    };
    const nutritionFacts2: NutritionFacts = {
      calories: 400,
      protein: 25,
      totalFat: 15,
      saturatedFat: 5,
      polyunsaturatedFat: 3,
      monounsaturatedFat: 6,
      transFat: 0,
      cholesterol: 50,
      sodium: 300,
      potassium: 500,
      totalCarbohydrates: 30,
      sugars: 10,
      addedSugars: 5,
      sugarAlcohols: 1,
      vitaminA: 20,
      vitaminC: 25,
      vitaminD: 10,
      calcium: 150,
      iron: 12,
      extraNutrition: {
        omega3: { key: "omega3", label: "Omega-3", unit: "mg", value: 250 },
        vitaminE: {
          key: "vitaminE",
          label: "Vitamin E",
          unit: "mg",
          value: 12,
        },
      },
    };
    const expected: NutritionFacts = {
      calories: 650,
      protein: 40,
      totalFat: 25,
      saturatedFat: 8,
      polyunsaturatedFat: 5,
      monounsaturatedFat: 10,
      transFat: 0,
      cholesterol: 80,
      sodium: 500,
      potassium: 800,
      totalCarbohydrates: 50,
      sugars: 15,
      addedSugars: 7,
      sugarAlcohols: 1,
      vitaminA: 30,
      vitaminC: 40,
      vitaminD: 15,
      calcium: 250,
      iron: 20,
      extraNutrition: {
        omega3: {
          key: "omega3",
          label: "Omega-3",
          unit: "mg",
          value: 500,
        },
        fiber: {
          key: "fiber",
          label: "Dietary Fiber",
          unit: "g",
          value: 4,
        },
        vitaminE: {
          key: "vitaminE",
          label: "Vitamin E",
          unit: "mg",
          value: 12,
        },
      },
    };

    const actual: NutritionFacts = addNutrition(
      nutritionFacts1,
      nutritionFacts2
    );
    expect(actual).toEqual(expected);
  });
});


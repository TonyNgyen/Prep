import { Recipe, Ingredient } from "@/types";

export const mockDatabase = {
  users: [] as any[],
  recipes: [] as Recipe[],
  ingredients: [] as Ingredient[],
};

export function resetMockDatabase() {
  mockDatabase.users = [
    {
      uid: "user_1",
      ingredients: ["ingredient_1"],
      inventory: ["recipe_1"],
      mealHistory: [],
      nutritionalHistory: [],
      recipes: [],
      goals: {},
    },
  ];

  mockDatabase.recipes = [
    {
      id: "recipe_1",
      name: "Test Recipe",
      ingredientsIdList: ["ingredient_1"],
      pricePerServing: null,
      numberOfServings: 2,
      servingSize: 150,
      servingUnit: "g",
      calories: 500,
      protein: 30,
      totalFat: 20,
      saturatedFat: 5,
      polyunsaturatedFat: 3,
      monounsaturatedFat: 6,
      transFat: 0,
      cholesterol: 50,
      sodium: 300,
      potassium: 400,
      totalCarbohydrates: 50,
      sugars: 10,
      addedSugars: 5,
      sugarAlcohols: 0,
      vitaminA: 15,
      vitaminC: 10,
      vitaminD: 8,
      calcium: 100,
      iron: 5,
      extraNutrition: {
        omega3: { key: "omega3", label: "Omega-3", unit: "mg", value: 250 },
      },
    },
  ];

  mockDatabase.ingredients = [
    {
      id: "ingredient_1",
      name: "Test Ingredient",
      servingSize: 100,
      servingUnit: "g",
      servingsPerContainer: 10,
      pricePerContainer: null,
      calories: 200,
      protein: 10,
      totalFat: 5,
      saturatedFat: 1,
      polyunsaturatedFat: 1,
      monounsaturatedFat: 2,
      transFat: 0,
      cholesterol: 10,
      sodium: 100,
      potassium: 200,
      totalCarbohydrates: 20,
      sugars: 5,
      addedSugars: 2,
      sugarAlcohols: 0,
      vitaminA: 5,
      vitaminC: 8,
      vitaminD: 3,
      calcium: 50,
      iron: 2,
      extraNutrition: {
        fiber: { key: "fiber", label: "Dietary Fiber", unit: "g", value: 4 },
      },
    },
  ];
}

export function getTable<T extends keyof typeof mockDatabase>(
  tableName: T
): (typeof mockDatabase)[T] {
  return mockDatabase[tableName];
}

export function insertIntoTable<T extends keyof typeof mockDatabase>(
  tableName: T,
  item: (typeof mockDatabase)[T][number]
) {
  mockDatabase[tableName].push(item);
}

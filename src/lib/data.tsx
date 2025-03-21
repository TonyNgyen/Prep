import { InventoryIngredient, InventoryRecipe, NutritionFacts } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { addNutrition } from "./functions";

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

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

type DailyMealEntry = {
  food: {
    [foodId: string]: InventoryIngredient | InventoryRecipe;
  };
  meal: string;
  nutrition: NutritionFacts;
};

const getUserId = async () => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error fetching user:", userError);
    return;
  }
  const userId = userData?.user?.id;
  return userId;
};

const fetchIngredients = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();

    const { data: fetchUserData, error: fetchUserError } = await supabase
      .from("users")
      .select()
      .eq("uid", userId);

    if (fetchUserError || !fetchUserData || fetchUserData.length === 0) {
      console.error("Error fetching user data:", fetchUserError);
      return;
    }

    const ingredientIdList = fetchUserData[0].ingredients;
    console.log(ingredientIdList);

    const { data: fetchIngredientData, error: fetchIngredientError } =
      await supabase.from("ingredients").select().in("id", ingredientIdList);

    if (fetchIngredientError || !fetchIngredientData) {
      console.error("Error fetching ingredients:", fetchIngredientError);
      return;
    }

    return fetchIngredientData;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

const fetchRecipes = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();

    const { data: fetchUserData, error: fetchUserError } = await supabase
      .from("users")
      .select()
      .eq("uid", userId);
    if (fetchUserError || !fetchUserData || fetchUserData.length === 0) {
      console.error("Error fetching user data:", fetchUserError);
      return;
    }

    const recipeList = fetchUserData[0].recipes;
    const { data: fetchRecipeData, error: fetchRecipeError } = await supabase
      .from("recipes")
      .select()
      .in("id", recipeList);

    if (fetchRecipeError || !fetchRecipeData) {
      console.error("Error fetching recipes:", fetchRecipeError);
      return;
    }

    return fetchRecipeData;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

const fetchInventory = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("inventory")
      .eq("uid", userId)
      .single();
    if (!data) {
      return {};
    }
    if (error) console.log(error);
    return data["inventory"];
  } catch (error) {
    console.log(error);
  }
};

const fetchMealHistory = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("mealHistory")
      .eq("uid", userId)
      .single();
    if (!data) {
      return {};
    }
    if (error) console.log(error);
    return data["mealHistory"];
  } catch (error) {
    console.log(error);
  }
};

const searchIngredientByName = async (ingredientSearch: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ingredients")
    .select()
    .eq("name", ingredientSearch);
  if (error) console.log(error);
  return data;
};

const searchIngredientById = async (idSearch: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ingredients")
    .select()
    .eq("id", idSearch);
  if (error) console.log(error);
  return data;
};

const searchRecipeByName = async (recipeSearch: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select()
    .eq("name", recipeSearch);
  if (error) console.log(error);
  return data;
};

const searchRecipeById = async (idSearch: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select()
    .eq("id", idSearch);
  if (error) console.log(error);
  return data;
};

const updateInventoryItem = async (
  inventory: ItemsToAdd,
  inventoryItem: InventoryIngredient | InventoryRecipe
) => {
  try {
    if (inventoryItem.id in inventory) {
      let currentInventoryItem = inventory[inventoryItem.id];
      let updatedTotalAmount =
        currentInventoryItem.totalAmount - inventoryItem.totalAmount;
      if (updatedTotalAmount == 0) {
        delete inventory[inventoryItem.id];
      } else {
        inventory[inventoryItem.id].totalAmount = updatedTotalAmount;
      }
    } else {
      inventory[inventoryItem.id] = inventoryItem;
    }

    return inventory;
  } catch (error) {
    console.log(error);
  }
};

const updateInventoryItems = async (itemsToUpdate: ItemsToAdd) => {
  let inventory = await fetchInventory();

  for (const item of Object.values(itemsToUpdate)) {
    inventory = await updateInventoryItem(inventory, item);
  }
  await updateInventory(inventory);
  return inventory;
};

const updateInventory = async (inventory: ItemsToAdd) => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { error: updateError } = await supabase
      .from("users")
      .update({ inventory })
      .eq("uid", userId);

    if (updateError) console.log(updateError);
  } catch (error) {}
};

const addToInventory = async (
  inventoryItems: Record<string, InventoryIngredient | InventoryRecipe>
) => {
  const supabase = createClient();
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("users")
    .select("inventory")
    .eq("uid", userId)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }
  const existingJson = data?.inventory || {};
  const updatedJson = { ...existingJson, ...inventoryItems };
  const { error: updateError } = await supabase
    .from("users")
    .update({ inventory: updatedJson })
    .eq("uid", userId);

  if (updateError) {
    console.error("Error updating JSONB column:", updateError);
  } else {
    console.log("JSONB column updated successfully!");
  }
};

const addToNutritionalHistory = async (
  date: string,
  nutrition: NutritionFacts
) => {
  const supabase = createClient();
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("users")
    .select("nutritionalHistory")
    .eq("uid", userId)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const nutritionalHistory = data?.nutritionalHistory || {};
  const existingEntry: NutritionFacts | undefined = nutritionalHistory[date];
  let updatedData: NutritionFacts;

  if (existingEntry) {
    updatedData = { ...existingEntry };
    updatedData = addNutrition(updatedData, nutrition);
  } else {
    updatedData = nutrition;
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({
      nutritionalHistory: {
        ...nutritionalHistory,
        [date]: updatedData,
      },
    })
    .eq("uid", userId);

  if (updateError) {
    console.error("Error updating nutritional history:", updateError);
  } else {
    console.log("Nutritional history updated successfully!");
  }
};

const isInventoryIngredient = (
  item: InventoryIngredient | InventoryRecipe
): item is InventoryIngredient => {
  return (
    "containers" in item && "numberOfServings" in item && "totalAmount" in item
  );
};

const isInventoryRecipe = (
  item: InventoryIngredient | InventoryRecipe
): item is InventoryRecipe => {
  return !isInventoryIngredient(item);
};

const updateMealHistory = async (
  date: string,
  meal: string,
  information: DailyMealEntry
) => {
  try {
    const supabase = createClient();
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("mealHistory")
      .eq("uid", userId)
      .single();

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    const mealHistory = data?.mealHistory || {};
    const { error: updateError } = await supabase
      .from("users")
      .update({
        mealHistory: {
          ...mealHistory,
          [date]: {
            ...mealHistory[date],
            [meal]: information,
          },
        },
      })
      .eq("uid", userId);

    if (updateError) {
      console.error("Error updating nutritional history:", updateError);
    } else {
      console.log("Nutritional history updated successfully!");
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

const addToMealHistory = async (
  meal: string,
  information: {
    nutrition: NutritionFacts;
    food: ItemsToAdd;
  },
  date: string
) => {
  const supabase = createClient();
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("users")
    .select("mealHistory")
    .eq("uid", userId)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const mealHistory = data?.mealHistory || {};
  const mealsForDay = mealHistory[date];

  if (!mealsForDay) {
    updateMealHistory(date, meal, { ...information, meal: meal });
    return;
  }

  const existingMealEntry: DailyMealEntry | undefined = mealHistory[date][meal];
  if (existingMealEntry) {
    Object.keys(information.food).forEach((id) => {
      const foodItem = information.food[id];

      if (id in existingMealEntry.food) {
        const existingItem = existingMealEntry.food[id];

        if (
          isInventoryIngredient(existingItem) &&
          isInventoryIngredient(foodItem)
        ) {
          existingItem.containers += foodItem.containers;
          existingItem.numberOfServings += foodItem.numberOfServings;
          existingItem.totalAmount += foodItem.totalAmount;
        } else if (
          isInventoryRecipe(existingItem) &&
          isInventoryRecipe(foodItem)
        ) {
          existingItem.servings += foodItem.servings;
          existingItem.totalAmount += foodItem.totalAmount;
        }
      } else {
        existingMealEntry.food[id] = foodItem;
      }
    });

    existingMealEntry.nutrition = addNutrition(
      existingMealEntry.nutrition,
      information.nutrition
    );

    updateMealHistory(date, meal, existingMealEntry);
    return;
  } else {
    updateMealHistory(date, meal, { ...information, meal: meal });
    return;
  }
};

const fetchGoals = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("goals")
      .eq("uid", userId)
      .single();
    if (!data) {
      return {};
    }
    if (error) console.log(error);
    console.log(data["goals"]);
    return data["goals"];
  } catch (error) {
    console.log(error);
  }
};

async function updateGoals(newGoal: Record<string, any>) {
  const supabase = createClient();
  const userId = await getUserId();

  const { data: existingData, error: fetchError } = await supabase
    .from("users")
    .select("goals")
    .eq("uid", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching existing goals:", fetchError);
    return null;
  }

  const updatedGoals = { ...existingData.goals, ...newGoal };

  const { data, error: updateError } = await supabase
    .from("users")
    .update({ goals: updatedGoals })
    .eq("uid", userId)
    .select();

  if (updateError) {
    console.error("Error updating JSONB column:", updateError);
    return null;
  }

  console.log("Successfully updated goals");
  return data;
}

const fetchNutritionalHistory = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("nutritionalHistory")
      .eq("uid", userId)
      .single();
    if (!data) {
      return {};
    }
    if (error) console.log(error);
    return data["nutritionalHistory"];
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchIngredients,
  fetchRecipes,
  fetchInventory,
  fetchMealHistory,
  searchIngredientByName,
  searchRecipeByName,
  addToInventory,
  addToNutritionalHistory,
  addToMealHistory,
  updateInventoryItem,
  updateInventoryItems,
  fetchGoals,
  fetchNutritionalHistory,
  updateGoals,
};

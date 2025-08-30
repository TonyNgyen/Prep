import {
  IngredientMeal,
  InventoryIngredient,
  InventoryRecipe,
  NutritionFacts,
  Recipe,
  RecipeMeal,
  UserInventory,
} from "@/types";
import { createClient } from "@/utils/supabase/client";
import {
  addNutrition,
  extractNutritionFacts,
  subtractNutrition,
} from "./functions";

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

type DailyMealEntry = {
  food: {
    [foodId: string]: InventoryIngredient | InventoryRecipe;
  };
  meal: string;
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

const addRecipe = async (
  name: string,
  recipeNutrition: NutritionFacts,
  ingredientList: Object,
  numberOfServings: number,
  servingSize: number,
  servingUnit: string
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .insert({
      ...recipeNutrition,
      ...{
        name: name,
        ingredientList: ingredientList,
        servingSize: servingSize,
        servingUnit: "g",
        timesUsed: 0,
        numberOfServings: numberOfServings,
        pricePerServing: 1,
      },
    })
    .select();

  if (error) {
    console.error("Error inserting data:", error.message);
    return false;
  }

  try {
    const recipeid = data?.[0]?.id;
    const { data: userData, error: userError } = await supabase.auth.getUser();

    const userId = userData?.user?.id;

    const { data: insertData } = await supabase.rpc("append_recipe_user", {
      userid: userId,
      recipeid: recipeid,
    });
  } catch (error) {
    console.error("Error adding recipe to user:", error);
  }
  return true;
};

const searchIngredientByName = async (ingredientSearch: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ingredients")
    .select()
    .ilike("name", `%${ingredientSearch}%`);

  if (error) console.log(error);
  return data;
};

const searchIngredientById = async (idSearch: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ingredients")
    .select()
    .eq("id", idSearch)
    .single();
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
  Object.entries(inventoryItems).map(([key, value]) => {
    if (key in existingJson) {
      existingJson[key].totalAmount += value.totalAmount;
    } else {
      existingJson[key] = value;
    }
  });
  const { error: updateError } = await supabase
    .from("users")
    .update({ inventory: existingJson })
    .eq("uid", userId);

  if (updateError) {
    console.error("Error updating JSONB column:", updateError);
  } else {
    console.log("JSONB column updated successfully!");
  }
};

const fetchIngredientsList = async (ingredientIds: string[]) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .in("id", ingredientIds);

  if (error) {
    console.error("Error fetching ingredients:", error);
    return {};
  }

  const ingredientMap = data.reduce((acc, ingredient) => {
    acc[ingredient.id] = ingredient;
    return acc;
  }, {} as Record<string, any>);

  console.log(ingredientMap);
  return ingredientMap;
};

const addRecipeToInventory = (
  inventory: Record<string, InventoryIngredient | InventoryRecipe>,
  recipe: Recipe,
  inventoryRecipe: InventoryRecipe,
  updateIngredients: boolean,
  zeroOutIngredients: boolean
) => {
  if (updateIngredients) {
    Object.entries(recipe.ingredientList).map(([key, value]) => {
      if (!(key in inventory)) {
        console.log("key does not exist");
        if (!zeroOutIngredients) {
          console.log(
            "Returning false since no ingredient to update and no zeroing out"
          );
          return [false, "Ingredient is not in inventory"];
        }
      } else {
        console.log("key does exist");
        let newAmount =
          inventory[key].totalAmount -
          value.servingSize * value.numberOfServings;
        if (newAmount < 0) {
          if (!zeroOutIngredients) {
            console.log(
              "Returning false since insufficient ingredient amount and no zeroing out"
            );
            return [false, `Insufficient amount of ${inventory[key].name}`];
          } else {
            newAmount = 0;
          }
        }
        inventory[key].totalAmount = newAmount;
      }
    });
  }
  if (inventoryRecipe.id in inventory) {
    (inventory[inventoryRecipe.id] as InventoryRecipe).totalAmount +=
      inventoryRecipe.totalAmount;
  } else {
    inventory[inventoryRecipe.id] = inventoryRecipe;
  }
  console.log(inventory);
};

const addIngredientToInventory = (
  inventory: Record<string, InventoryIngredient | InventoryRecipe>,
  inventoryIngredient: InventoryIngredient
) => {
  try {
    if (inventoryIngredient.id in inventory) {
      inventory[inventoryIngredient.id].totalAmount =
        inventory[inventoryIngredient.id].totalAmount +
        inventoryIngredient.totalAmount;
    } else {
      inventory[inventoryIngredient.id] = inventoryIngredient;
    }
    console.log(inventory);
    return inventory;
  } catch (error) {
    console.log(error);
  }
};

const addToNutritionalHistory = async (
  date: string,
  nutrition: NutritionFacts,
  meal: string
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
  const mealsForDay: Record<string, NutritionFacts> =
    nutritionalHistory[date] || {};

  let updatedMealNutrition: NutritionFacts;

  if (mealsForDay[meal]) {
    updatedMealNutrition = addNutrition({ ...mealsForDay[meal] }, nutrition);
  } else {
    updatedMealNutrition = nutrition;
  }

  const updatedHistory = {
    ...nutritionalHistory,
    [date]: {
      ...mealsForDay,
      [meal]: updatedMealNutrition,
    },
  };

  const { error: updateError } = await supabase
    .from("users")
    .update({ nutritionalHistory: updatedHistory })
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
          existingItem.numberOfServings += foodItem.numberOfServings;
          existingItem.totalAmount += foodItem.totalAmount;
        }
      } else {
        existingMealEntry.food[id] = foodItem;
      }
    });

    updateMealHistory(date, meal, existingMealEntry);
    return;
  } else {
    updateMealHistory(date, meal, { ...information, meal: meal });
    return;
  }
};

const fetchNutritionalGoals = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("nutritionalGoals")
      .eq("uid", userId)
      .single();
    if (!data) {
      return {};
    }
    if (error) console.log(error);
    return data["nutritionalGoals"];
  } catch (error) {
    console.log(error);
  }
};

const fetchCurrentWeightGoal = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("currentWeightGoal")
      .eq("uid", userId)
      .single();

    if (!data) {
      return {};
    }
    if (error) console.log(error);
    return data["currentWeightGoal"];
  } catch (error) {
    console.log(error);
  }
};

const fetchWeightGoals = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("weightGoals")
      .eq("uid", userId)
      .single();
    if (!data) {
      return {};
    }
    if (error) console.log(error);
    console.log(data["weightGoals"]);
    return data["weightGoals"];
  } catch (error) {
    console.log(error);
  }
};

const updateNutritionalGoals = async (
  newGoal: Record<string, Record<string, number | string>>
) => {
  const supabase = createClient();
  try {
    const userId = await getUserId();

    const { data: existingData, error: fetchError } = await supabase
      .from("users")
      .select("nutritionalGoals")
      .eq("uid", userId)
      .single();

    if (fetchError) {
      console.log("Error fetching existing goals:", fetchError);
      return false;
    }

    const updatedGoals = {
      ...(existingData?.nutritionalGoals || {}),
      ...newGoal,
    };

    const { error: updateError } = await supabase
      .from("users")
      .update({ nutritionalGoals: updatedGoals })
      .eq("uid", userId);

    if (updateError) {
      console.log("Error updating nutritional goals:", updateError);
      return false;
    }

    console.log("Nutritional goals updated successfully:", updatedGoals);
    return true;
  } catch (error) {
    console.log("Error:", error);
    return false;
  }
};

async function updateGoals(newGoal: Record<string, any>) {
  const supabase = createClient();
  const userId = await getUserId();

  const { data: existingData, error: fetchError } = await supabase
    .from("users")
    .select("nutritionalGoals")
    .eq("uid", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching existing goals:", fetchError);
    return null;
  }

  const updatedGoals = { ...existingData.nutritionalGoals, ...newGoal };

  const { data, error: updateError } = await supabase
    .from("users")
    .update({ nutritionalGoals: updatedGoals })
    .eq("uid", userId)
    .select();

  if (updateError) {
    console.error("Error updating JSONB column:", updateError);
    return null;
  }

  console.log("Successfully updated goals");
  return data;
}

const fetchAllNutritionalHistory = async () => {
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

const fetchAllWeightHistory = async () => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("weightHistory")
      .eq("uid", userId)
      .single();
    if (!data) {
      return {};
    }
    if (error) console.log(error);
    return data["weightHistory"];
  } catch (error) {
    console.log(error);
  }
};

const setWeightHistory = async (date: string, weight: number) => {
  const supabase = createClient();

  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from("users")
      .select("weightHistory")
      .eq("uid", userId)
      .single();

    if (error) {
      console.error("Error fetching weightHistory:", error);
      return null;
    }

    const currentHistory = data?.weightHistory || {};
    const updatedHistory = { ...currentHistory, [date]: weight };

    const { error: updateError } = await supabase
      .from("users")
      .update({ weightHistory: updatedHistory })
      .eq("uid", userId);

    if (updateError) {
      console.error("Error updating weightHistory:", updateError);
      return null;
    }

    return updatedHistory;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

const fetchDayWeightHistory = async (date: string) => {
  const supabase = createClient();
  try {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .select("weightHistory")
      .eq("uid", userId)
      .single();
    if (!data) {
      return {};
    }
    if (error) console.log(error);
    return data["weightHistory"][date] ? data["weightHistory"][date] : 0;
  } catch (error) {
    console.log(error);
  }
};

const fetchDayNutritionalHistory = async (date: string) => {
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
    console.log(data["nutritionalHistory"]);
    console.log(date);
    console.log(data["nutritionalHistory"][date]);
    return data["nutritionalHistory"][date]
      ? data["nutritionalHistory"][date]
      : {
          calories: 0,
          protein: 0,
          totalFat: 0,
          saturatedFat: 0,
          polyunsaturatedFat: 0,
          monounsaturatedFat: 0,
          transFat: 0,
          cholesterol: 0,
          sodium: 0,
          potassium: 0,
          totalCarbohydrates: 0,
          dietaryFiber: 0,
          totalSugars: 0,
          addedSugars: 0,
          sugarAlcohols: 0,
          vitaminA: 0,
          vitaminC: 0,
          vitaminD: 0,
          calcium: 0,
          iron: 0,
          extraNutrition: {},
        };
  } catch (error) {
    console.log(error);
  }
};

const deleteMealFromMealHistory = async (
  date: string,
  meal: string,
  foodId: string
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
      console.error("Error fetching meal history:", error);
      return;
    }

    const mealHistory = data?.mealHistory || {};
    const dailyEntry = mealHistory[date]?.[meal] as DailyMealEntry | undefined;

    if (!dailyEntry || !dailyEntry.food?.[foodId]) {
      console.warn("Food entry not found for given date/meal/foodId.");
      return;
    }

    const updatedFood = { ...dailyEntry.food };
    delete updatedFood[foodId];

    const updatedMealEntry: DailyMealEntry = {
      ...dailyEntry,
      food: updatedFood,
    };

    await updateMealHistory(date, meal, updatedMealEntry);
  } catch (err) {
    console.error("Failed to remove food:", err);
  }
};

const deleteMealFromNutritionalHistory = async (
  date: string,
  meal: string,
  food: IngredientMeal | RecipeMeal
) => {
  try {
    const supabase = createClient();
    const userId = await getUserId();
    let foodInformation;

    if (food.type === "ingredient") {
      foodInformation = await searchIngredientById(food.id);
    } else if (food.type === "recipe") {
      foodInformation = await searchRecipeById(food.id);
    }

    const foodNutrition = extractNutritionFacts(foodInformation);

    const { data, error } = await supabase
      .from("users")
      .select("nutritionalHistory")
      .eq("uid", userId)
      .single();

    if (error) {
      console.error("Error fetching nutritional history:", error);
      return;
    }

    const nutritionalHistory = data?.nutritionalHistory || {};
    const dailyNutrition = nutritionalHistory[date];
    const mealNutrition = dailyNutrition?.[meal];

    if (!dailyNutrition || !mealNutrition) {
      console.warn("Nutrition entry not found for given date/meal.");
      return;
    }

    const updatedNutrition = subtractNutrition(mealNutrition, foodNutrition);

    const updatedNutritionalHistory = {
      ...nutritionalHistory,
      [date]: {
        ...dailyNutrition,
        [meal]: updatedNutrition,
      },
    };

    const { error: updateError } = await supabase
      .from("users")
      .update({ nutritionalHistory: updatedNutritionalHistory })
      .eq("uid", userId);

    if (updateError) {
      console.error("Error updating nutritional history:", updateError);
    } else {
      console.log("Nutritional history updated successfully!");
    }
  } catch (err) {
    console.error("Failed to remove food:", err);
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
  fetchNutritionalGoals,
  fetchAllNutritionalHistory,
  updateGoals,
  addRecipe,
  fetchIngredientsList,
  addRecipeToInventory,
  updateInventory,
  addIngredientToInventory,
  fetchDayNutritionalHistory,
  fetchAllWeightHistory,
  fetchDayWeightHistory,
  fetchWeightGoals,
  setWeightHistory,
  fetchCurrentWeightGoal,
  updateNutritionalGoals,
  deleteMealFromMealHistory,
  searchIngredientById,
  deleteMealFromNutritionalHistory,
};

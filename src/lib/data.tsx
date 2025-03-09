import { InventoryIngredient, InventoryRecipe } from "@/types";
import { createClient } from "@/utils/supabase/client";

const fetchIngredients = async () => {
  const supabase = createClient();
  try {
    //console.log("1");
    const { data: userData, error: userError } = await supabase.auth.getUser();
    //console.log("8");

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }
    //console.log("2");

    const userId = userData?.user?.id;

    const { data: fetchUserData, error: fetchUserError } = await supabase
      .from("users")
      .select()
      .eq("uid", userId);

    if (fetchUserError || !fetchUserData || fetchUserData.length === 0) {
      console.error("Error fetching user data:", fetchUserError);
      return;
    }
    //console.log("3");

    const ingredientIdList = fetchUserData[0].ingredients;
    console.log(ingredientIdList);

    const { data: fetchIngredientData, error: fetchIngredientError } =
      await supabase.from("ingredients").select().in("id", ingredientIdList);

    if (fetchIngredientError || !fetchIngredientData) {
      console.error("Error fetching ingredients:", fetchIngredientError);
      return;
    }
    //console.log("4");

    return fetchIngredientData;
    //console.log("5");
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

const fetchRecipes = async () => {
  const supabase = createClient();
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    // console.log("8");

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }
    // console.log("2");

    const userId = userData?.user?.id;

    const { data: fetchUserData, error: fetchUserError } = await supabase
      .from("users")
      .select()
      .eq("uid", userId);
    if (fetchUserError || !fetchUserData || fetchUserData.length === 0) {
      console.error("Error fetching user data:", fetchUserError);
      return;
    }
    // console.log("3");

    const recipeList = fetchUserData[0].recipes;
    const { data: fetchRecipeData, error: fetchRecipeError } = await supabase
      .from("recipes")
      .select()
      .in("id", recipeList);

    if (fetchRecipeError || !fetchRecipeData) {
      console.error("Error fetching recipes:", fetchRecipeError);
      return;
    }
    //console.log("4");

    return fetchRecipeData;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

const searchIngredient = async (ingredientSearch: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ingredients")
    .select()
    .eq("name", ingredientSearch);
  if (error) console.log(error);
  return data;
};

const searchRecipe = async (recipeSearch: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select()
    .eq("name", recipeSearch);
  if (error) console.log(error);
  return data;
};

const addToInventory = async (
  inventoryItems: Record<string, InventoryIngredient | InventoryRecipe>
) => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  const userId = userData?.user?.id;

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

export {
  fetchIngredients,
  fetchRecipes,
  searchIngredient,
  searchRecipe,
  addToInventory,
};

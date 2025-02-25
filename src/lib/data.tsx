type Nutrition = {
  [key: string]: number;
};

// Define a type for the ingredient
type Ingredient = {
  id: string;
  name: string;
  nutrition: Nutrition;
  servingSize?: number;
  servingUnit?: string;
  servingsPerContainer?: number;
  pricePerContainer?: number;
  howManyTimesUsed?: number;
  createdAt: Date;
};

type Recipe = {
  id: string;
  name: string;
  nutrition: Nutrition;
  ingredientsList: IngredientsList
  howManyServings: number;
  pricePerServing?: number;
  howManyTimesUsed?: number;
};

type IngredientsList = {
  [key: string]: Ingredient;
};

const getIngredients = async (userID: string): Promise<Ingredient[]> => {
  try {
    // Reference the 'ingredients' subcollection for a specific user
    const ingredientsRef = collection(db, `users/${userID}/ingredients`);

    // Fetch all documents in the subcollection
    const ingredientsSnapshot = await getDocs(ingredientsRef);

    // Map over the documents to get their data
    const ingredients = ingredientsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Ingredient[]; // Explicitly cast to Ingredient[]

    console.log("Ingredients:", ingredients);
    return ingredients;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};

const getRecipes = async (userID: string): Promise<Recipe[]> => {
  try {
    // Reference the 'ingredients' subcollection for a specific user
    const recipesRef = collection(db, `users/${userID}/recipes`);

    // Fetch all documents in the subcollection
    const recipesSnapshot = await getDocs(recipesRef);

    // Map over the documents to get their data
    const recipes = recipesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[]; // Explicitly cast to Ingredient[]

    console.log("recipes:", recipes);
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export { getIngredients, getRecipes };

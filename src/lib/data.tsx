import { auth, db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

type Nutrition = {
  [key: string]: number | { amount: number; unit: string };
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
};

const getIngredients = async (): Promise<Ingredient[]> => {
  try {
    // Reference the 'ingredients' subcollection for a specific user
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated");
      return [];
    }
    const ingredientsRef = collection(db, `users/${user.uid}/ingredients`);

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

export { getIngredients };

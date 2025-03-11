import { InventoryIngredient, InventoryRecipe, NutritionFacts } from "@/types";
import React from "react";

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

type PageProps = {
  nutrition: NutritionFacts;
  logFood: ItemsToAdd;
  inventory: ItemsToAdd;
};

function Page2({ nutrition, logFood, inventory }: PageProps) {
  return (
    <div>
      Page2
      <div className="bg-blue-200 p-4" onClick={() => console.log(logFood)}>
        Current Log
      </div>
      <div className="bg-red-200 p-4" onClick={() => console.log(inventory)}>
        Current Inventory
      </div>
    </div>
  );
}

export default Page2;

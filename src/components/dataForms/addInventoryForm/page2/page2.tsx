import { InventoryIngredient, InventoryRecipe } from "@/types";
import React from "react";

type PageProps = {
  ItemsToAdd: Record<string, InventoryIngredient | InventoryRecipe>;
};

function Page2({ ItemsToAdd }: PageProps) {
  return (
    <div className="">
      {!(Object.keys(ItemsToAdd).length) && <h1 className="text-center font-bold text-2xl mt-10">No items to add to inventory</h1>}
      {Object.values(ItemsToAdd).map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}

export default Page2;

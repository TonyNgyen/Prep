import { InventoryIngredient, InventoryRecipe } from "@/types";
import React from "react";

type PageProps = {
  ItemsToAdd: Record<string, InventoryIngredient | InventoryRecipe>;
};

function Page2({ ItemsToAdd }: PageProps) {
  return (
    <div>
      <h1>Page 2</h1>
      <div onClick={() => console.log(ItemsToAdd)}>Debug</div>
      {Object.values(ItemsToAdd).map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}

export default Page2;

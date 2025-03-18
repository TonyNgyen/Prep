"use client";

import { updateInventoryItem } from "@/lib/data";
import { InventoryIngredient } from "@/types";
import React from "react";

function InventoryPage() {
  const testInventoryItem: InventoryIngredient = {
    id: "bf624727-aad1-44c4-84d7-f7f63e155d55",
    name: "Ground Beef",
    type: "ingredient",
    unit: "g",
    containers: 1,
    servingSize: 2,
    totalAmount: 4,
    numberOfServings: 4,
  };
  return (
    <div>
      <h1>InventoryPage</h1>
      <div
        className="bg-red-200 p-4"
        onClick={() => updateInventoryItem(testInventoryItem)}
      >
        Test Update Inventory
      </div>
    </div>
  );
}

export default InventoryPage;

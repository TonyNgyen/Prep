"use client";

import AddInventoryForm from "@/components/dataForms/addInventoryForm/addInventoryForm";
import InventoryIngredientInfo from "@/components/ingredientInfo/inventoryIngredientInfo";
import PageHeader from "@/components/pageHeader/pageHeader";
import InventoryRecipeInfo from "@/components/recipeInfo/inventoryRecipeInfo";
import { fetchInventory } from "@/lib/data";
import { InventoryIngredient, InventoryRecipe } from "@/types";
import React, { useEffect, useState } from "react";

function InventoryPage() {
  const [inventoryList, setInventoryList] = useState<
    Record<string, InventoryIngredient | InventoryRecipe>
  >({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const inventory = await fetchInventory();
      console.log(inventory);
      setInventoryList(inventory);
    };
    fetch();
  }, []);

  const isInventoryIngredient = (
    item: InventoryIngredient | InventoryRecipe
  ): item is InventoryIngredient => {
    return item.type === "ingredient";
  };

  if (showAddForm) {
    return <AddInventoryForm setShowAddForm={setShowAddForm} isForm={true} />;
  } else {
    return (
      <div className="p-6 pb-[6.5rem]">
        <PageHeader>Inventory</PageHeader>
        <div className="flex gap-4  mb-4">
          <button
            className="bg-gray-800 text-white p-2 px-4 rounded-md font-semibold text-lg"
            onClick={() => setShowAddForm(true)}
          >
            Add to Inventory
          </button>
        </div>
        <div className="space-y-3">
          {Object.values(inventoryList).map((item) => (
            <div key={item.id}>
              {isInventoryIngredient(item) ? (
                <InventoryIngredientInfo ingredient={item} />
              ) : (
                <InventoryRecipeInfo recipe={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default InventoryPage;

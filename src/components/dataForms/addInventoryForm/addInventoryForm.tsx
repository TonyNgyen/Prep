"use client";

import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Page1 from "./page1/page1";
import Page2 from "./page2/page2";
import { InventoryIngredient, InventoryRecipe } from "@/types";
import { addToInventory } from "@/lib/data";

type formProp = {
  setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>; // Now optional
  isForm: boolean;
};

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>; // Keyed by ID

function AddInventoryForm({ setShowAddForm, isForm }: formProp) {
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsToAdd, setItemsToAdd] = useState<ItemsToAdd>({});

  const addInventoryIngredient = (
    id: string,
    name: string,
    containers: number,
    servingSize: number,
    numberOfServings: number,
    totalAmount: number,
    unit: string,
    type: string
  ) => {
    setItemsToAdd((prev) => ({
      ...prev,
      [id]: {
        id,
        name,
        containers,
        servingSize,
        numberOfServings,
        totalAmount,
        unit,
        type,
      },
    }));
  };

  const addInventoryRecipe = (
    id: string,
    name: string,
    servings: number,
    servingSize: number,
    totalAmount: number,
    unit: string,
    type: string
  ) => {
    setItemsToAdd((prev) => ({
      ...prev,
      [id]: {
        id,
        name,
        servings,
        servingSize,
        totalAmount,
        unit,
        type,
      },
    }));
  };

  return (
    <div className="p-6 pb-[4rem] flex flex-col relative h-[calc(100vh-5rem)] gap-3">
      <div className="flex justify-between mb-3 items-center">
        <h1 className="text-3xl font-bold">Add to Inventory</h1>
        {isForm && setShowAddForm && (
          <button onClick={() => setShowAddForm(false)} className="flex2">
            <IoIosClose className="text-5xl flex" />
          </button>
        )}
      </div>

      <div className="overflow-scroll pb-6">
        {pageNumber == 1 && (
          <Page1
            addInventoryIngredient={addInventoryIngredient}
            addInventoryRecipe={addInventoryRecipe}
          />
        )}
        {pageNumber == 2 && <Page2 ItemsToAdd={itemsToAdd} />}
      </div>

      <div className="w-full flex justify-between absolute bottom-0 left-0 px-6 py-3 h-16">
        {pageNumber != 1 ? (
          <button
            type="button"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber - 1)
            }
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        {pageNumber != 2 ? (
          <button
            type="button"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber + 1)
            }
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={() => addToInventory(itemsToAdd)}
          >
            Add Inventory
          </button>
        )}
      </div>
    </div>
  );
}

export default AddInventoryForm;

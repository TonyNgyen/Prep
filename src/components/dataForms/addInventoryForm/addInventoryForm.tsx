"use client";

import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Page1 from "./page1/page1";
import Page2 from "./page2/page2";
import { InventoryIngredient, InventoryRecipe, UserInventory } from "@/types";
import { addToInventory, fetchInventory, updateInventory } from "@/lib/data";

type formProp = {
  setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: boolean;
};

type ItemsToAdd = Record<string, InventoryIngredient | InventoryRecipe>;

function AddInventoryForm({ setShowAddForm, isForm }: formProp) {
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsToAdd, setItemsToAdd] = useState<ItemsToAdd>({});
  const [inventory, setInventory] = useState<UserInventory>({});

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

  useEffect(() => {
    const fetch = async () => {
      try {
        const fetchInven = await fetchInventory();
        setInventory(fetchInven);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

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
            inventory={inventory}
          />
        )}
        {pageNumber == 2 && <Page2 ItemsToAdd={itemsToAdd} />}
      </div>

      <div className="w-full flex justify-between absolute bottom-0 left-0 px-6 py-3 h-16">
        {/* <button type="button" onClick={() => console.log(inventory)} className="bg-pink-300">
          Inventory
        </button>
        <button type="button" onClick={() => updateInventory(inventory)} className="bg-orange-300">
          Update Inventory
        </button> */}
        {pageNumber != 1 ? (
          <button
            type="button"
            className="bg-gray-800 text-white font-semibold rounded-md px-4 py-2"
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber - 1)
            }
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        {pageNumber !== 2 ? (
          <button
            type="button"
            className="bg-gray-800 text-white font-semibold rounded-md px-4 py-2"
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber + 1)
            }
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className={`bg-gray-800 text-white font-semibold rounded-md px-4 py-2 ${
              Object.keys(itemsToAdd).length > 0 ? "" : "opacity-50"
            }`}
            onClick={() => updateInventory(inventory)}
            disabled={Object.keys(itemsToAdd).length === 0}
          >
            Add Inventory
          </button>
        )}
      </div>
    </div>
  );
}

export default AddInventoryForm;

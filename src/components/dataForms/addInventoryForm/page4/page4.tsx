import React from "react";

type InventoryIngredient = {
  id: string;
  name: string;
  servingSize: number;
  numberOfServings: number;
  totalAmount: number;
};

type PageProps = {
  ItemsToAdd: Record<string, InventoryIngredient>;
};

function Page4({ ItemsToAdd }: PageProps) {
  return <div onClick={() => console.log(ItemsToAdd)}>Page4</div>;
}

export default Page4;

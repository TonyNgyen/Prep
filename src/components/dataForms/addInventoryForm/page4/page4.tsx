import React from "react";

type InventoryItem = {
  id: string;
  name: string;
  servingSize: number;
  amountOfServings: number;
  totalAmount: number;
};

type PageProps = {
  ItemsToAdd: Record<string, InventoryItem>;
};

function Page4({ ItemsToAdd }: PageProps) {
  return <div onClick={() => console.log(ItemsToAdd)}>Page4</div>;
}

export default Page4;

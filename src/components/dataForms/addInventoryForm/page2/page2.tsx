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

function Page2({ ItemsToAdd }: PageProps) {
  return <div onClick={() => console.log(ItemsToAdd)}>Page2</div>;
}

export default Page2;

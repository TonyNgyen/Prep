import Link from "next/link";
import React from "react";

function MoreList() {
  return (
    <div>
      <ul className="space-y-3 p-4">
        <li className="text-2xl">
          <Link href="/inventory">Inventory</Link>
        </li>
        <li className="text-2xl">
          <Link href="/recipes">Recipes</Link>
        </li>
        <li className="text-2xl">
          <Link href="/ingredients">Ingredients</Link>
        </li>
        <li className="text-2xl">
          <Link href="/account/goals">Goals</Link>
        </li>
        <li className="text-2xl">
          <Link href="/weight">Weight</Link>
        </li>
        <li className="text-2xl">
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default MoreList;

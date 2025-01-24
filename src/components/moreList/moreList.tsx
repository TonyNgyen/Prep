import Link from "next/link";
import React from "react";

function MoreList() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/food">Food</Link>
        </li>
        <li>
          <Link href="/recipes">Recipes</Link>
        </li>
        <li>
          <Link href="/ingredients">Ingredients</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default MoreList;

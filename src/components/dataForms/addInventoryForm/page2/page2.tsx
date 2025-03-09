import { searchIngredient, searchRecipe } from "@/lib/data";
import { Ingredient, Recipe } from "@/types";
import React, { useState } from "react";

type pageProps = {
  addType: string | null;
};

function Page2({ addType }: pageProps) {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Recipe[] | Ingredient[]>([]);
  const searchItem = async () => {
    let data;
    if (addType == "ingredients") {
      data = await searchIngredient(search);
    } else {
      data = await searchRecipe(search);
    }
    setSearchResult(data ?? []);
  };
  return (
    <div>
      <div className="flex">
        <input
          type="text"
          placeholder="Lettuce"
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchItem();
            }
          }}
          className="border rounded-md w-full p-2 border-gray-300"
          required
        />
        <button
          type="button"
          className="bg-mainGreen px-3 text-white font-semibold"
          onClick={searchItem}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Page2;

import React from "react";

type pageProps = {
  setAddType: React.Dispatch<React.SetStateAction<string | null>>;
};

function Page1({ setAddType }: pageProps) {
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold mb-10">
        What will you be adding to your inventory?
      </h1>
      <div className="h-96 flex flex-col gap-4">
        <button
          className="h-1/2 bg-mainGreen rounded-md font-bold text-xl text-white"
          onClick={() => setAddType("ingredients")}
        >
          Ingredient
        </button>
        <button
          className="h-1/2 bg-mainGreen rounded-md font-bold text-xl text-white"
          onClick={() => setAddType("recipes")}
        >
          Recipe
        </button>
      </div>
    </div>
  );
}

export default Page1;

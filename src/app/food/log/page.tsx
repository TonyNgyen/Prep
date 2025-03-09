"use client";

import React, { useState } from "react";

function LogFoodPage() {
  const [name, setName] = useState<string>("");
  return (
    <div className="p-6 pb-[4rem] flex flex-col relative h-[calc(100vh-5rem)] gap-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Log Food</h1>
      </div>
      <div>
        <label className="block font-semibold text-2xl">Food Name</label>
        <input
          type="text"
          placeholder="Lettuce"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md w-full p-2 border-gray-300"
          required
        />
      </div>
    </div>
  );
}

export default LogFoodPage;

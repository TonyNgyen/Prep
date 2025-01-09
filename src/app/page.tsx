"use client";
import NavBar from "@/components/navbar/navbar";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState(true);
  if (!user) {
    return <div>Not Logged In</div>;
  } else {
    return (
      <div className="px-4">
        <div className="pt-10 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Hello User</h1>
          <a href="/account" className="flex items-center">
            <button className="">
              <MdAccountCircle className="h-[45px] w-[45px]" />
            </button>
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-mainGreen p-4 text-white rounded-lg shadow-md">
            Log Meal
          </div>
          <div className="bg-white p-4 text-black rounded-lg shadow-md">
            Nutritional Values
          </div>
          <div className="bg-white p-4 text-black rounded-lg shadow-md">
            Weight History
          </div>
        </div>
      </div>
    );
  }
}

"use client";

import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { AiOutlineHistory } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function NavBar() {
  const [user, setUser] = useState(true);
  if (!user) {
    return (
      <div className="w-full py-5 lg:px-20 px-5 flex justify-between items-center">
        <h1 className="text-mainGreen text-6xl font-bold">Prep</h1>
        <div className="flex gap-4">
          <button className="bg-mainGreen text-white lg:px-6 px-4 py-2 rounded-full text-2xl font-semibold">
            <a href="/login">Login</a>
          </button>
          <button className="border-mainGreen border-4 text-mainGreen lg:px-6 px-4 py-2 rounded-full text-2xl font-semibold">
            <a href="signup">Sign Up</a>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full py-5 lg:px-20 px-5 flex justify-between items-center fixed bottom-0 left-0 bg-mainGreen h-20">
        <a href="/">
          <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1">
            <IoHome className="w-full h-full" />
            <p className="font-semibold text-sm">Home</p>
          </button>
        </a>
        <a href="/history">
          <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1 ">
            <AiOutlineHistory className="w-full h-full" />
            <p className="font-semibold text-sm">History</p>
          </button>
        </a>
        <button className="w-[70px] h-[70px] flex flex-col items-center justify-center text-white rounded-full">
          <IoIosAddCircle className="w-full h-full" />
        </button>
        <a href="/edit">
          <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1 ">
            <MdEdit className="w-full h-full" />
            <p className="font-semibold text-sm">Edit</p>
          </button>
        </a>
        <a href="/stock">
          <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1">
            <MdInventory className="w-full h-full" />
            <p className="font-semibold text-sm">Stock</p>
          </button>
        </a>
      </div>
    );
  }
}

export default NavBar;

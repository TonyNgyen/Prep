"use client";

import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { IoIosAddCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

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
        <button className="w-[60px] h-[60px] flex flex-col items-center justify-center text-white gap-1">
          <IoHome className="w-full h-full" />
          <p className="font-semibold text-sm">Home</p>
        </button>
        <button className="w-[60px] h-[60px] flex flex-col items-center justify-center text-white gap-1">
          <LuHistory className="w-full h-full" />
          <p className="font-semibold text-sm">History</p>
        </button>
        <button className="w-[75px] h-[75px] flex flex-col items-center justify-center text-white rounded-full">
          <IoIosAddCircle className="w-full h-full" />
        </button>
        <button className="w-[60px] h-[60px] flex flex-col items-center justify-center text-white gap-1">
          <MdAccountCircle className="w-full h-full" />
          <p className="font-semibold text-sm">Account</p>
        </button>
        <button className="w-[60px] h-[60px] flex flex-col items-center justify-center text-white gap-1">
          <FaGear className="w-full h-full" />
          <p className="font-semibold text-sm">Settings</p>
        </button>
      </div>
    );
  }
}

export default NavBar;

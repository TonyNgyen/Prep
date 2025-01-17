"use client";

import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { AiOutlineHistory } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import AddPopup from "../addPopup/addPop";

function NavBar() {
  const [user, setUser] = useState(true);
  const [addPopup, setAddPopup] = useState(false);
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
      <div className="w-full py-5 lg:px-20 px-2 flex justify-between items-center fixed bottom-0 left-0 bg-mainGreen h-20 z-50">
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
        <div className="relative">
          <div className={`absolute left-1/2 -translate-x-1/2 -top-[7.75rem]`}>
            {addPopup && <AddPopup />}
          </div>

          <button
            className="w-[70px] h-[70px] flex flex-col items-center justify-center text-white rounded-full"
            onClick={() => setAddPopup(!addPopup)}
          >
            <IoIosAddCircle className="w-full h-full" />
          </button>
        </div>

        <a href="/inventory">
          <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1">
            <MdInventory className="w-full h-full" />
            <p className="font-semibold text-sm">Inventory</p>
          </button>
        </a>
        <a href="/more">
          <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1 ">
            <FiMoreHorizontal className="w-full h-full" />
            <p className="font-semibold text-sm">More</p>
          </button>
        </a>
      </div>
    );
  }
}

export default NavBar;

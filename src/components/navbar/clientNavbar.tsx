"use client";

import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { AiOutlineHistory } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import AddPopup from "../addPopup/addPop";
import Link from "next/link";

function ClientNavbar() {
  const [addPopup, setAddPopup] = useState(false);
  return (
    <div className="w-full py-5 lg:px-20 px-2 flex justify-between items-center fixed bottom-0 left-0 bg-mainGreen h-20 z-50">
      <Link href="/">
        <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1">
          <IoHome className="w-full h-full" />
          <p className="font-semibold text-sm">Home</p>
        </button>
      </Link>
      <Link href="/history">
        <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1 ">
          <AiOutlineHistory className="w-full h-full" />
          <p className="font-semibold text-sm">History</p>
        </button>
      </Link>
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

      <Link href="/inventory">
        <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1">
          <MdInventory className="w-full h-full" />
          <p className="font-semibold text-sm">Inventory</p>
        </button>
      </Link>
      <Link href="/more">
        <button className="w-[55px] h-[55px] flex flex-col items-center justify-center text-white gap-1 ">
          <FiMoreHorizontal className="w-full h-full" />
          <p className="font-semibold text-sm">More</p>
        </button>
      </Link>
    </div>
  );
}

export default ClientNavbar;

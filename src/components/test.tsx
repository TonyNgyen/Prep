"use client";
import React, { useState } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { AiOutlineHistory } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import AddPopup from "../components/addPopup/addPop";

export default function Logout() {
  const pathname = usePathname();
  const [addPopup, setAddPopup] = useState(false);

  if (!currentUser) {
    return (
      <div className="w-full py-5 lg:px-20 px-5 flex justify-between items-center">
        <a href="/" className="text-mainGreen text-6xl font-bold">
          Prep
        </a>
        <div className="flex gap-2 items-center justify-center">
          <button className="border-mainGreen border-[3px] bg-mainGreen text-white lg:px-6 px-4 py-2 rounded-full text-lg font-semibold">
            <a href="/login">Login</a>
          </button>
          <button className="border-mainGreen border-[3px] text-mainGreen lg:px-6 px-4 py-2 rounded-full text-lg font-semibold">
            <a href="signup">Sign Up</a>
          </button>
        </div>
      </div>
    );
  }

  if (true) {
    return (
      <>
        <Link href={"/"}>
          <h1 className={"text-base sm:text-lg textGradient "}>Broodl</h1>
        </Link>
        <Link href={"/history"}>
          <button>Go to dashboard</button>
        </Link>
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
            <div
              className={`absolute left-1/2 -translate-x-1/2 -top-[7.75rem]`}
            >
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
      </>
    );
  }

  return (
    <>
      <Link href={"/"}>
        <h1 className={"text-base sm:text-lg textGradient "}>Broodl</h1>
      </Link>
      <button>Logout</button>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { AiOutlineHistory } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import AddPopup from "../addPopup/addPop";
import Link from "next/link";
import { User } from "@supabase/supabase-js"; // Import the User type
import { createClient } from "@/utils/supabase/client";

function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [addPopup, setAddPopup] = useState(false);
  const supabase = createClient();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      console.log("no user");
      setUser(null);
    } else {
      setUser(data.user);
    }
  };
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      getUser();
    });
  }, [supabase]);

  if (!user) {
    return (
      <div className="w-full py-5 lg:px-20 px-5 flex justify-between items-center">
        <Link href="/" className="text-mainGreen text-6xl font-bold">
          Prep
        </Link>
        <div className="flex gap-2 items-center justify-center">
          <button className="border-mainGreen border-[3px] bg-mainGreen text-white lg:px-6 px-4 py-2 rounded-full text-lg font-semibold">
            <Link href="/login">Login</Link>
          </button>
          <button className="border-mainGreen border-[3px] text-mainGreen lg:px-6 px-4 py-2 rounded-full text-lg font-semibold">
            <Link href="signup">Sign Up</Link>
          </button>
        </div>
      </div>
    );
  } else {
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
}

export default NavBar;

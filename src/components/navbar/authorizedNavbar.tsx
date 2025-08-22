"use client";

import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import AddPopup from "../addPopup/addPop";
import { IoMdBookmarks } from "react-icons/io";
import { MdInsertChart } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AuthorizedNavbar() {
  const [addPopup, setAddPopup] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: IoHome },
    { href: "/log", label: "Log", icon: IoMdBookmarks },
    { href: "/statistics", label: "Stats", icon: MdInsertChart },
    { href: "/more", label: "More", icon: FiMoreHorizontal },
  ];

  return (
    <>
      {/* Mobile Navbar (bottom) */}
      <div className="fixed bottom-0 left-0 w-full h-20 bg-white z-50 flex justify-between items-center px-2 lg:hidden">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`w-[55px] h-[55px] flex flex-col items-center justify-center gap-1 rounded-lg transition-colors ${
              pathname === href ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setAddPopup(false)}
          >
            <Icon className="w-full h-full" />
            <p className="font-semibold text-sm">{label}</p>
          </Link>
        ))}

        {/* Add Button */}
        <div className="relative">
          {addPopup && (
            <div className="absolute left-1/2 -translate-x-1/2 -top-[8rem]">
              <AddPopup setAddPopup={setAddPopup} />
            </div>
          )}
          <button
            className="w-[60px] h-[60px] flex flex-col items-center justify-center text-mainGreen rounded-full"
            onClick={() => setAddPopup(!addPopup)}
          >
            <IoIosAddCircle className="w-full h-full" />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar (left) */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:py-10 lg:gap-6 fixed top-0 left-0 h-full w-24 bg-white z-50">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`w-[55px] h-[55px] flex flex-col items-center justify-center gap-1 rounded-lg transition-colors ${
              pathname === href ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setAddPopup(false)}
          >
            <Icon className="w-full h-full" />
            <p className="font-semibold text-sm">{label}</p>
          </Link>
        ))}

        {/* Add Button in sidebar */}
        <div className="relative mt-6">
          {addPopup && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4">
              <AddPopup setAddPopup={setAddPopup} />
            </div>
          )}
          <button
            className="w-[60px] h-[60px] flex flex-col items-center justify-center text-mainGreen rounded-full"
            onClick={() => setAddPopup(!addPopup)}
          >
            <IoIosAddCircle className="w-full h-full" />
          </button>
        </div>
      </div>
    </>
  );
}

export default AuthorizedNavbar;

"use client";

import React, { useState } from "react";
import Link from "next/link";

function UnauthorizedNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full py-6 lg:px-20 px-6 flex justify-between items-center">
      <Link href="/" className="text-mainGreen text-5xl font-bold">
        Prep
      </Link>
      <div className="flex gap-2 items-center justify-center">
        <button
          onClick={toggleMenu}
          className="lg:hidden text-5xl text-mainGreen"
        >
          ☰
        </button>
      </div>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-mainGreen text-white py-2 rounded-full w-24 hidden lg:block">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="border-mainGreen border-[3px] text-mainGreen py-2 rounded-full w-24 hidden lg:block">
            Sign Up
          </button>
        </Link>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-4xl">
            &times;
          </button>
        </div>
        <div className="p-6 space-y-4">
          <Link href="/" className="block text-lg font-semibold">
            Home
          </Link>
          {/* <Link href="/about" className="block text-lg font-semibold">
            About
          </Link>
          <Link href="/contact" className="block text-lg font-semibold">
            Contact
          </Link> */}
          <div className="mt-4">
            <Link href="/login">
              <button className="w-full bg-mainGreen text-white py-2 rounded-full">
                Login
              </button>
            </Link>
          </div>
          <div className="mt-2">
            <Link href="/signup">
              <button className="w-full border-mainGreen border-[3px] text-mainGreen py-2 rounded-full">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedNavbar;

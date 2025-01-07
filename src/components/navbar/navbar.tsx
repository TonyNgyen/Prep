import React from "react";

function NavBar() {
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
}

export default NavBar;

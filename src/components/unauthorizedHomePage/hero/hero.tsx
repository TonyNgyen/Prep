import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="bg-mainGreen flex items-center justify-center px-5 py-10 flex-col gap-5">
      <h1 className="text-4xl font-bold leading-[2.8rem] text-center tracking-wide text-white">
        Simplify Your Meal Prep Journey
      </h1>
      <h2 className="text-lg text-gray-200 text-center tracking-wide">
        Plan, prepare, and enjoy healthy meals without the stress
      </h2>
      <Link
        href="/signup"
        className="bg-white text-mainGreen font-bold text-xl w-full py-2 rounded-md tracking-wider text-center"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Hero;

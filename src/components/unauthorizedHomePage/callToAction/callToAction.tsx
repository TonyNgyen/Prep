import Link from "next/link";
import React from "react";

function CallToAction() {
  return (
    <div className="text-center flex flex-col gap-7 px-7 py-14 bg-mainGreen">
      <h1 className="text-4xl font-bold leading-[2.8rem] text-center tracking-wide text-white">
        Ready to Simplify Your Meal Prep?
      </h1>
      <p className="text-lg text-white tracking-wide">
        Join Prep today and start your journey to stress-free, healthy eating
      </p>
      <Link
        href="/signup"
        className="bg-white text-mainGreen font-bold text-xl w-full py-2 rounded-md tracking-wider text-center md:w-52 mx-auto"
      >
        Sign Up Now
      </Link>
    </div>
  );
}

export default CallToAction;

"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "./actions";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center px-4">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-mainGreen">
            Welcome to Prep
          </h2>
          <h3 className="text-gray-500">Create your account</h3>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainGreen focus:border-transparent"
          />
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter your password"
            className="mt-1 block w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mainGreen focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-sm text-mainGreen hover:underline focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <button
            type="submit"
            formAction={signup}
            className="w-full py-2 bg-mainGreen text-white rounded-md text-lg font-semibold transition-all hover:bg-mainGreen-dark focus:outline-none focus:ring-2 focus:ring-mainGreen"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          <span>Already have an account? </span>
          <Link
            href="/login"
            className="text-mainGreen font-semibold hover:underline"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/firebase";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-6 w-11/12 absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-zinc-300 bg-[#f1ded5] p-9 rounded-lg border-2 border-[#d3beb5]"
    >
      <h1 className="text-center text-4xl font-semibold">Login</h1>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Email</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-[2px] p-3 rounded-md border-black bg-transparent text-xl w-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-[2px] p-3 rounded-md border-black bg-transparent text-xl w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-mainGreen text-white rounded-lg py-3 font-bold text-xl"
      >
        Log in
      </button>
      <h3 className="text-center text-lg font-medium">
        Don't have an account?{" "}
        <a href="/signup" className="text-mainGreen font-bold">
          Sign up!
        </a>
      </h3>
    </form>
  );
}

export default LoginForm;

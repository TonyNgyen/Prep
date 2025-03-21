"use client";

import React, { useState } from "react";
import Link from "next/link";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );
      console.log("User created:", userCredential.user);

      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, { createdAt: serverTimestamp() }, { merge: true });
      const settingsRef = doc(collection(userRef, "settings"));
      await setDoc(settingsRef, {});
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-6 w-11/12 absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-zinc-300 bg-[#f1ded5] p-9 rounded-lg border-2 border-[#d3beb5]"
    >
      <h1 className="text-center text-4xl font-semibold">Sign Up</h1>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Email</h2>
        <input
          type="email"
          placeholder="Email"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          required
          className="border-[2px] p-3 rounded-md border-black bg-transparent text-xl w-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
          required
          className="border-[2px] p-3 rounded-md border-black bg-transparent text-xl w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-mainGreen text-white rounded-lg py-3 font-bold text-xl"
      >
        Sign Up
      </button>
      <h3 className="text-center text-lg font-medium">
        Have an Account?{" "}
        <Link href="/login" className="text-mainGreen font-bold">
          Log in!
        </Link>
      </h3>
    </form>
  );
}

export default SignupForm;

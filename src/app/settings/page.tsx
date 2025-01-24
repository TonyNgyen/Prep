"use client";

import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

function SettingsPage() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("user");
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <div>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </div>
  );
}

export default SettingsPage;

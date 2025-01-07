"use client";
import NavBar from "@/components/navbar/navbar";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState(true);
  if (!user) {
    return <div>Not Logged In</div>;
  } else {
    return (
      <div>
        <div>Hi User!</div>
        <div>Log Meal</div>
        <div>Nutritional Value</div>
      </div>
    );
  }
}

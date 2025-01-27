"use client";

import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/navbar/navbar";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();

  return (
    <div className={currentUser ? "min-h-screen pb-20" : "min-h-screen"}>
      <div className="content">{children}</div>
      {currentUser && <NavBar />}
    </div>
  );
}

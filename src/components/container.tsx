"use client";


import NavBar from "@/components/navbar/navbar";

export default function Container({ children }: { children: React.ReactNode }) {


  return (
    <div className={currentUser ? "min-h-screen pb-20" : "min-h-screen"}>
      <NavBar />
      <div className="content">{children}</div>
    </div>
  );
}

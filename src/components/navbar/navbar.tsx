import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ClientNavbar from "./clientNavbar";

export default async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="w-full py-5 lg:px-20 px-5 flex justify-between items-center">
        <Link href="/" className="text-mainGreen text-6xl font-bold">
          Prep
        </Link>
        <div className="flex gap-2 items-center justify-center">
          <button className="border-mainGreen border-[3px] bg-mainGreen text-white lg:px-6 px-4 py-2 rounded-full text-lg font-semibold">
            <Link href="/login">Login</Link>
          </button>
          <button className="border-mainGreen border-[3px] text-mainGreen lg:px-6 px-4 py-2 rounded-full text-lg font-semibold">
            <Link href="signup">Sign Up</Link>
          </button>
        </div>
      </div>
    );
  } else {
    return <ClientNavbar />;
  }
}

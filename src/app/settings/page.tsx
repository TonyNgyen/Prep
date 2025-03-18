"use client";

import React from "react";
import { logout } from "../logout/actions";
import Link from "next/link";

function SettingsPage() {
  return (
    <div className="space-y-3">
      <Link href={"/account/goals"}>Update Goals</Link>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export default SettingsPage;

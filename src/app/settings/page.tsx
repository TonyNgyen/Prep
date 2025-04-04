"use client";

import React from "react";
import { logout } from "../logout/actions";
import Link from "next/link";

function SettingsPage() {
  return (
    <div className="space-y-3 p-4">
      <form action={logout}>
        <button type="submit" className="text-2xl">Logout</button>
      </form>
    </div>
  );
}

export default SettingsPage;

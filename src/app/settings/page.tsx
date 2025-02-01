"use client";

import React from "react";
import { logout } from "../logout/actions";

function SettingsPage() {
  return (
    <div>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export default SettingsPage;

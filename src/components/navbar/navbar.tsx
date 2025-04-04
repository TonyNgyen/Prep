import React from "react";
import { createClient } from "@/utils/supabase/server";
import AuthorizedNavbar from "./authorizedNavbar";
import UnauthorizedNavbar from "./unauthorizedNavbar";

export default async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <UnauthorizedNavbar />;
  } else {
    return <AuthorizedNavbar />;
  }
}

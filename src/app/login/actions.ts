"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const signupInput = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: userdata, error } = await supabase.auth.signUp(signupInput);

  if (userdata !== null && userdata.user !== null) {
    const { data, error } = await supabase
      .from("users")
      .insert([{ uid: userdata.user.id, email: userdata.user.email }]);
    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Inserted data:", data);
    }
  }

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

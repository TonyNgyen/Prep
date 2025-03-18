import { createClient } from "@/utils/supabase/server";
import Dashboard from "@/components/dashboard/dashboard";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Not logged in</div>;
  } else {
    return <Dashboard />;
  }
}

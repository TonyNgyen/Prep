import { createClient } from "@/utils/supabase/server";
import Dashboard from "@/components/dashboard/dashboard";
import Hero from "@/components/unauthorizedHomePage/hero/hero";
import Reasons from "@/components/unauthorizedHomePage/reasons/reasons";
import CallToAction from "@/components/unauthorizedHomePage/callToAction/callToAction";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex flex-col gap-16">
        <Hero />
        <Reasons />
        <CallToAction />
      </div>
    );
  } else {
    return (
      <div className="">
        <Dashboard />
      </div>
    );
  }
}

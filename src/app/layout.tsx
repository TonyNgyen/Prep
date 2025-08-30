import "./globals.css";
import NavBar from "@/components/navbar/navbar";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Prep",
  description: "The meal prep helper",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className="min-h-screen">
        {user ? (
          <div className="">
            <NavBar />
            <main className="ml-24">{children}</main>
          </div>
        ) : (
          <div className="">
            <NavBar />
            <main className="">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}

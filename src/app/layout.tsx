import "./globals.css";
import NavBar from "@/components/navbar/navbar";

export const metadata = {
  title: "Prep",
  description: "The meal prep helper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <NavBar />
        <div className="ml-24">{children}</div>
      </body>
    </html>
  );
}

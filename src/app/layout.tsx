import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
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
      <AuthProvider>
        <body>
          <NavBar />

          {children}
        </body>
      </AuthProvider>
    </html>
  );
}

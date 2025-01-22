import NavBar from "@/components/navbar/navbar";
import "./globals.css";
import { AuthProvider } from "@/components/authProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <AuthProvider>
          <NavBar />
        </AuthProvider>

        {children}
      </body>
    </html>
  );
}

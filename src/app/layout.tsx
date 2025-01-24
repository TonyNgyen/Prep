import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/test";
import NavBar from "@/components/navbar/navbar";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Broodl",
  description: "Track your daily mood every day of the year!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Logout />
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <Link href={"https://youtu.be/lkjrUW8fI40"} target="_blank" className="">
        <p
          className={
            "text-indigo-500 duration-200 hover:text-white hover:bg-indigo-500  " +
            fugaz.className
          }
        >
          Built by Smoljames 💛
        </p>
      </Link>
    </footer>
  );

  return (
    // <html lang="en">
    //   <AuthProvider>
    //     <body
    //       className={
    //         "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800  " +
    //         opensans.className
    //       }
    //     >
    //       {header}

    //       {children}
    //       {footer}
    //     </body>
    //   </AuthProvider>
    // </html>
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

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/shared/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio Porject Manager",
  description: "Design & Develop By Abdur Rahman Adil ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main className="flex-1 container mx-auto max-w-6xl px-6 md:px-0 ">{children}</main>
      </body>
    </html>
  );
}

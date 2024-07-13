"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
      <SessionProvider>
        <>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        </>
        </SessionProvider>
      </body>
    </html>
  );
}

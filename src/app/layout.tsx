"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import { CustomProvider } from "rsuite";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>net Solutions POC</title>
      </head>
      <body className={inter.className}>
        {" "}
        <CustomProvider>
          {" "}
          <AuthContextProvider>{children}</AuthContextProvider>
        </CustomProvider>
      </body>
    </html>
  );
}

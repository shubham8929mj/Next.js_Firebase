"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import { CustomProvider } from "rsuite";
import { AuthContextProvider, useAuthContext } from "@/context/AuthContext";
import Navbar from "@/comonents/Navbar";

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
        <CustomProvider>
          <AuthContextProvider>
            <ContentWrapper>{children}</ContentWrapper>
          </AuthContextProvider>
        </CustomProvider>
      </body>
    </html>
  );
}

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();
  return (
    <>
      {user && (
        <div style={{ marginBottom: "67px" }}>
          <Navbar />
        </div>
      )}
      {children}
    </>
  );
};

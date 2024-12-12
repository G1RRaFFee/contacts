"use client";

import "reflect-metadata";
import "./globals.css";
import { ContactsList } from "@/components/shared";

import { Inter } from "next/font/google";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        overscrollBehavior: "none",
      }}
    >
      <body
        className={inter.className}
        style={{
          display: "flex",
          position: "relative",
          height: "100vh",
          backgroundColor: "#202020",
          overflowY: "hidden",
        }}
      >
        <ContactsList />
        {children}
      </body>
    </html>
  );
}

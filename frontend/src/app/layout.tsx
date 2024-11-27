"use client";

import "reflect-metadata";
import "./globals.css";

import { ContactsList } from "@/components/shared";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          position: "relative",
          height: "100vh",
        }}
      >
        <ContactsList />
        {children}
      </body>
    </html>
  );
}

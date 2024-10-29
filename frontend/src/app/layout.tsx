import type { Metadata } from "next";
import "./globals.css";

import { ContactsList } from "@/components/shared";
export const metadata: Metadata = {
  title: "Contacts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContactsList />
        {children}
      </body>
    </html>
  );
}

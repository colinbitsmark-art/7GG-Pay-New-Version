import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PreferencesProvider } from "@/components/preferences-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "7GG Pay",
  description: "Global fiat and crypto payment infrastructure"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}

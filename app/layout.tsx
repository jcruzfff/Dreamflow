import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Replace the problematic localFont with a standard Google font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-helvetica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dreamflow Designs",
  description: "High-performance website with custom animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

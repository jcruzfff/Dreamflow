import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
  title: {
    default: "Dreamflow Designs",
    template: "%s | Dreamflow Designs",
  },
  description: "The Go-To Design Subscription for leading Web3, AI, and visionary tech companies.",
  keywords: ["design", "ui/ux", "subscription", "branding", "tech", "startups", "web3", "AI"],
  authors: [{ name: "Dreamflow Designs" }],
  creator: "Dreamflow Designs",
  publisher: "Dreamflow Designs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dreamflowlabs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dreamflowlabs.com",
    siteName: "Dreamflow Designs",
    title: "Dreamflow Designs",
    description: "The Go-To Design Subscription for leading Web3, AI, and visionary tech companies.",
    images: [
      {
        url: "https://www.dreamflowlabs.com/thumbnail-two.png",
        width: 1200,
        height: 630,
        alt: "Dreamflow Designs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreamflow Designs",
    description: "The Go-To Design Subscription for leading Web3, AI, and visionary tech companies.",
    images: ["https://www.dreamflowlabs.com/thumbnail-two.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  manifest: "/site.webmanifest",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

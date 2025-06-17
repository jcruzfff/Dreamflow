import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Visioneer Newsletter | Dreamflow",
  description: "The Newsletter To Help You Build A Profitable Brand. Get weekly systems, design templates and AI workflows that save time, drive growth and unlock founder freedom.",
  keywords: ["newsletter", "branding", "AI workflows", "design templates", "systems", "business growth", "founder", "profitable brand"],
  authors: [{ name: "Dreamflow Labs" }],
  creator: "Dreamflow Labs",
  publisher: "Dreamflow Labs",
  metadataBase: new URL("https://dreamflowlabs.com"),
  alternates: {
    canonical: "/dreamflow-newsletter",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dreamflowlabs.com/dreamflow-newsletter",
    siteName: "Dreamflow",
    title: "The Dreamflow Newsletter | Dreamflow",
    description: "The Newsletter To Help You Build A Profitable Brand. Get weekly systems, design templates and AI workflows that save time, drive growth and unlock founder freedom.",
    images: [
      {
        url: "https://dreamflowlabs.com/images/visioneer-og.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "The Dreamflow Newsletter - Build A Profitable Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Visioneer Newsletter | Dreamflow",
    description: "The Newsletter To Help You Build A Profitable Brand. Get weekly systems, design templates and AI workflows.",
    images: ["https://dreamflowlabs.com/images/visioneer-og.png"],
    creator: "@dreamflowlabs",
  },
};

export default function VisioneerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
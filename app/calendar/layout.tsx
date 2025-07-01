import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call - Free UX & Growth Teardown | Dreamflow",
  description: "Get actionable design & systems feedback to fix bottlenecks, boost conversions and scale smarter. Book your free consultation call today.",
  openGraph: {
    title: "Book a Call - Free UX & Growth Teardown | Dreamflow",
    description: "Get actionable design & systems feedback to fix bottlenecks, boost conversions and scale smarter. Book your free consultation call today.",
    images: [
      {
        url: "/images/book-call-og.png",
        width: 1200,
        height: 630,
        alt: "Book a Call with Dreamflow - Free UX & Growth Teardown",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Call - Free UX & Growth Teardown | Dreamflow",
    description: "Get actionable design & systems feedback to fix bottlenecks, boost conversions and scale smarter. Book your free consultation call today.",
    images: ["/images/book-call-og.png"],
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
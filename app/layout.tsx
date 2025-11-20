import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Santosh Kumar | Double Your Income with Strategic Business Execution",
    template: "%s | Santosh Kumar",
  },
  description:
    "Forbes Council Member helping entrepreneurs double their income through strategic business execution. 3000+ students trained, 50+ businesses scaled. Book your free strategy call today.",
  keywords: [
    "business strategy",
    "entrepreneurship",
    "business consulting",
    "Forbes Council",
    "business growth",
    "online courses",
    "keynote speaking",
  ],
  authors: [{ name: "Santosh Kumar" }],
  creator: "Santosh Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.santoshkumar.com",
    title: "Santosh Kumar | Double Your Income with Strategic Business Execution",
    description:
      "Forbes Council Member helping entrepreneurs double their income through strategic business execution.",
    siteName: "Santosh Kumar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santosh Kumar | Double Your Income",
    description:
      "Forbes Council Member helping entrepreneurs scale their businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <Navigation />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

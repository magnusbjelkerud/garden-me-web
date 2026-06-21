import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gardenme.app"),
  title: "Garden Me — Your garden's personal assistant",
  description: "AI plant identification, year-round care reminders, pest tracking, and weather alerts. For iOS and Android.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Garden Me",
    description: "Because your plants can't text you when they're dying.",
    url: "https://gardenme.app",
    siteName: "Garden Me",
    images: [{ url: "/icon.png", width: 1024, height: 1024 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>{children}</body>
    </html>
  );
}

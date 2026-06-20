import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SplashCursorWrapper from "@/components/SplashCursorWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Apex Scaling | Premium Website Development Agency",
  description: "We build high-converting, premium websites from ₹10,000. Designed to convert, engineered for speed, and structured to scale. Get your free quote today.",
  keywords: [
    "website design agency India",
    "affordable web development",
    "business website ₹10000",
    "digital marketing agency India",
    "Apex Scaling",
    "Next.js agency India",
    "Gulf website developer",
  ],
  authors: [{ name: "Apex Scaling Team" }],
  creator: "Apex Scaling",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://apexscaling.co",
    title: "Apex Scaling | Premium Website Development Agency",
    description: "High-converting, premium websites from ₹10,000. Designed to convert, engineered for speed, and structured to scale.",
    siteName: "Apex Scaling",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Scaling | Premium Website Development Agency",
    description: "High-converting, premium websites from ₹10,000. Designed to convert, engineered for speed, and structured to scale.",
  },
  metadataBase: new URL("https://apexscaling.co"),
};

export default function RootLayout({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#06040a] text-white relative">
        <div className="film-grain" />
        <SplashCursorWrapper />
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "./components/smooth-scroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.inerate.com"),
  title: "Inerate Tools — Free PDF, Image & Document Utilities",
  description:
    "Merge PDFs, convert images, build resumes, and more — fast, private, browser-based tools. No upload, no wait.",
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
  openGraph: {
    title: "Inerate Tools — Free PDF, Image & Document Utilities",
    description: "Fast, private, browser-based tools. No upload, no wait.",
    url: "https://tools.inerate.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

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
  openGraph: {
    title: "Inerate Tools — Free PDF, Image & Document Utilities",
    description: "Fast, private, browser-based tools. No upload, no wait.",
    url: "https://tools.inerate.com",
  },
};

// Runs before first paint — no FOUC. Keep in sync with app/lib/theme.ts's `resolve()`.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('theme');if(!t||t==='auto'){t=matchMedia('(prefers-color-scheme: dark)').matches?'iridescence':'daylight';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  verification: {
    google: "IjKxHgKEUbe-uaMB6SnyAx-2u_dMRaOsuR6n6pCnt9I",
  },
  title: "Woyuduin — What You Doing?! | Anti-Porn App for Men",
  description:
    "Block porn, kill urges, build discipline. Woyuduin is the anti-porn bodyguard that runs 24/7 — VPN blocker, 5-step interruption system, accountability partner, and a brotherhood of men fighting the same battle.",
  keywords: [
    "quit porn",
    "porn blocker",
    "anti porn app",
    "nofap app",
    "accountability app",
    "porn addiction",
    "content blocker",
    "woyuduin",
  ],
  openGraph: {
    title: "Woyuduin — What You Doing?!",
    description: "Block porn. Kill urges. Build discipline. Join 100,000+ men.",
    type: "website",
    url: "https://woyuduin.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Woyuduin — What You Doing?!",
    description: "Block porn. Kill urges. Build discipline.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} font-sans antialiased bg-bg text-white`}>
        {children}
      </body>
    </html>
  );
}

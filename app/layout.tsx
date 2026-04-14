import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://woyuduin.com"),
  verification: {
    google: "IjKxHgKEUbe-uaMB6SnyAx-2u_dMRaOsuR6n6pCnt9I",
  },
  title: {
    default: "Woyuduin — Block Porn, Kill Urges, Build Discipline | Free Android App",
    template: "%s | Woyuduin",
  },
  description:
    "Download Woyuduin free — the #1 anti-porn app for men. VPN-based DNS blocker, 5-step urge interruption, accountability partners, journal, AI counselor, and a brotherhood of men fighting the same battle. No Play Store needed.",
  keywords: [
    "quit porn",
    "porn blocker",
    "porn blocker app",
    "anti porn app",
    "block porn android",
    "nofap app",
    "porn addiction recovery",
    "accountability app",
    "porn addiction app",
    "content blocker",
    "woyuduin",
    "block adult content",
    "porn blocker free",
    "stop watching porn",
    "porn addiction help",
    "nofap tracker",
    "adult content blocker android",
    "best porn blocker 2026",
    "free porn blocker app",
    "discipline app",
  ],
  openGraph: {
    title: "Woyuduin — Block Porn & Build Discipline",
    description:
      "Download free — the #1 anti-porn app for men. VPN blocker, urge interruption, accountability partners, and a brotherhood. No Play Store needed.",
    type: "website",
    url: "https://woyuduin.com",
    siteName: "Woyuduin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Woyuduin — Block Porn & Build Discipline",
    description:
      "The #1 anti-porn app for men. Free download, no Play Store needed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://woyuduin.com",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Woyuduin",
  operatingSystem: "Android",
  applicationCategory: "HealthApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Block porn, kill urges, build discipline. VPN-based DNS blocker with 5-step urge interruption system.",
  downloadUrl: "https://woyuduin.com/woyuduin.apk",
  fileSize: "52MB",
  softwareVersion: "1.0",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How does Woyuduin block porn?", "acceptedAnswer": { "@type": "Answer", "text": "Woyuduin creates a local VPN on your device that filters DNS requests. Adult sites are blocked at the network level — works on every app and browser. PIN-protected with a 24-hour disable delay." }},
            { "@type": "Question", "name": "Is Woyuduin free?", "acceptedAnswer": { "@type": "Answer", "text": "Basic plan starts at $5/month with VPN blocker and PIN protection. Pro plan at $12/month adds AI counselor, journal, community, and accountability partners. 5-day free trial on Pro." }},
            { "@type": "Question", "name": "Does Woyuduin work without internet?", "acceptedAnswer": { "@type": "Answer", "text": "The VPN blocker works offline. Journal, habits, and urge interruption work offline. Community features and AI counselor need internet." }},
            { "@type": "Question", "name": "Can I disable the blocker when I get an urge?", "acceptedAnswer": { "@type": "Answer", "text": "That's the point — you can't. PIN protection with a 24-hour disable delay means by the time you can turn it off, the urge has passed." }},
            { "@type": "Question", "name": "Is my data private?", "acceptedAnswer": { "@type": "Answer", "text": "100%. All data stays on your device. We don't upload your browsing history, urge logs, or any personal data. The VPN runs locally." }}
          ]
        })}} />
      </head>
      <body
        className={`${geistSans.variable} font-sans antialiased bg-bg text-white`}
      >
        {children}
      </body>
    </html>
  );
}

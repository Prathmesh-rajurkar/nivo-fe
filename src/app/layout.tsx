import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nivo — Compare Mutual Funds on Metrics That Matter",
    template: "%s | Nivo",
  },
  description: "Neutral, data-first mutual fund research platform. Compare 35+ metrics across returns, risk, portfolio, valuation & fund info. No paywalls. Direct plans only.",
  keywords: ["mutual funds", "fund comparison", "investment research", "NAV", "CAGR", "Sharpe ratio", "expense ratio", "Indian mutual funds"],
  authors: [{ name: "Nivo" }],
  creator: "Nivo",
  publisher: "Nivo",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nivo.in",
    siteName: "Nivo",
    title: "Nivo — Compare Mutual Funds on Metrics That Matter",
    description: "Neutral, data-first mutual fund research. 35+ metrics. No paywalls.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nivo - Mutual Fund Comparison Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivo — Compare Mutual Funds",
    description: "Neutral, data-first mutual fund research. 35+ metrics. No paywalls.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { MSWProvider } from "@/components/providers/msw-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>
          <MSWProvider>
            {children}
          </MSWProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
"use client"

import Link from "next/link"
import { ExternalLink, Shield, Database, Zap, Globe, Mail, Share2, Link as LucideLink } from "lucide-react"
import { cn } from "@/lib/utils"

const FOOTER_LINKS = {
  product: [
    { label: "Fund Search", href: "/search" },
    { label: "Compare Funds", href: "/compare" },
    { label: "Categories", href: "/categories" },
    { label: "Screener (Soon)", href: "#" },
  ],
  data: [
    { label: "Methodology", href: "/methodology" },
    { label: "Data Sources", href: "/data-sources" },
    { label: "Metric Definitions", href: "/metrics" },
    { label: "API Docs", href: "/api-docs" },
  ],
  legal: [
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
  community: [
    { label: "GitHub", href: "https://github.com", external: true },
    { label: "Twitter", href: "https://twitter.com", external: true },
    { label: "Feedback", href: "/feedback" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Nivo</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Neutral, data-first mutual fund research.
              Compare funds on metrics that matter — no paywalls, no biased ratings.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                Not Investment Advice
              </span>
              <span className="flex items-center gap-1">
                <Database className="h-3.5 w-3.5" />
                Public Data Only
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                Direct Plans
              </span>
            </div>
          </div>

          <nav>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h4 className="font-semibold mb-4">Data & Methodology</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.data.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Nivo. Built for Indian mutual fund investors.
            <br />
            <span className="text-xs">Data from AMFI, mfapi.in, NSE/BSE. Not SEBI-registered advice.</span>
          </p>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <LucideLink className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <Share2 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
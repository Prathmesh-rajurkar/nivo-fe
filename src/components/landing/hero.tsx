"use client"

import { ArrowRight, Search, BarChart3, Shield, Globe, Zap } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-3 w-3" />
            <span>Nivo - Neutral Mutual Fund Research Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Compare Mutual Funds <br />
            <span className="text-primary">On Metrics That Matter</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            No paywalls. No biased ratings. Just 35+ metrics — returns, risk, portfolio, valuation —
            computed from public data so you can decide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start Comparing Funds
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 text-lg px-8 py-3 rounded-lg border border-input bg-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Open Compare Table
              <BarChart3 className="h-5 w-5" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              Direct Plan Only
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              Public Data Sources
            </span>
            <span className="flex items-center gap-1.5">
              <Search className="h-4 w-4" />
              No Registration Required
            </span>
          </div>
        </div>

        {/* Preview of compare table */}
        <div className="mt-16 relative">
          <div className="absolute -inset-4 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-xl border bg-card/50 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-4 text-sm text-muted-foreground font-mono">compare?ids=HDFC_FLEXI,NIPPON_SMALL,ICICI_BLUECHIP</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 px-3 font-medium w-40">Metric</th>
                    <th className="text-right py-2 px-3 font-medium w-32">HDFC Flexi Cap</th>
                    <th className="text-right py-2 px-3 font-medium w-32">Nippon Small Cap</th>
                    <th className="text-right py-2 px-3 font-medium w-32">ICICI Bluechip</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">3Y CAGR</td>
                    <td className="py-2 px-3 text-right text-green-600 font-mono">18.42%</td>
                    <td className="py-2 px-3 text-right text-green-600 font-mono">22.15%</td>
                    <td className="py-2 px-3 text-right text-green-600 font-mono">15.87%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Sharpe Ratio</td>
                    <td className="py-2 px-3 text-right text-primary font-mono">1.24</td>
                    <td className="py-2 px-3 text-right text-primary font-mono">0.98</td>
                    <td className="py-2 px-3 text-right text-primary font-mono">1.12</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Max Drawdown</td>
                    <td className="py-2 px-3 text-right text-red-600 font-mono">-18.3%</td>
                    <td className="py-2 px-3 text-right text-red-600 font-mono">-28.7%</td>
                    <td className="py-2 px-3 text-right text-red-600 font-mono">-15.2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Expense Ratio</td>
                    <td className="py-2 px-3 text-right font-mono">82 bps</td>
                    <td className="py-2 px-3 text-right font-mono">95 bps</td>
                    <td className="py-2 px-3 text-right font-mono">72 bps</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">vs Category (3Y)</td>
                    <td className="py-2 px-3 text-right text-green-600 font-mono">+2.1%</td>
                    <td className="py-2 px-3 text-right text-green-600 font-mono">+3.8%</td>
                    <td className="py-2 px-3 text-right text-red-600 font-mono">-0.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t bg-muted/30 text-xs text-muted-foreground">
              <span className="font-medium">35+ metrics</span> across Returns, Risk, Portfolio, Valuation & Fund Info •
              Accordions for each group • Best-in-column highlighted
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
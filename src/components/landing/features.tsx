"use client"

import {
  TrendingUp,
  Shield,
  PieChart,
  DollarSign,
  Info,
  Search,
  BarChart3,
  Filter,
  Database,
  Zap,
  Globe,
  Lock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { METRIC_GROUPS } from "@/lib/metric-defs"

const FEATURES = [
  {
    icon: Search,
    title: "Instant Fund Search",
    description: "Find any fund by name, AMC, or category with autocomplete. Direct-Growth plans only — no noise from regular/IDCW variants.",
    href: "/search",
  },
  {
    icon: BarChart3,
    title: "Side-by-Side Compare",
    description: "Compare up to 5 funds across 35+ metrics. Accordion groups for Returns, Risk, Portfolio, Valuation, Fund Info. Best-in-column highlighted.",
    href: "/compare",
  },
  {
    icon: TrendingUp,
    title: "Returns That Matter",
    description: "Absolute (3M, 6M, 1Y), CAGR (3Y, 5Y, 10Y), 3Y average rolling return, and performance vs sub-category median — all precomputed nightly.",
  },
  {
    icon: Shield,
    title: "Risk & Performance",
    description: "Alpha, Beta, Volatility, Sharpe, Sortino, Max Drawdown, Tracking Error, Category Std Dev, % from ATH — 3-year trailing window, 252-day annualization.",
  },
  {
    icon: PieChart,
    title: "Portfolio Composition",
    description: "Equity/Debt/Cash split, Large/Mid/Small cap breakdown, Top 3/5/10 concentration, Sovereign vs Corporate debt, Credit rating buckets (coming Phase 2).",
  },
  {
    icon: DollarSign,
    title: "Valuation & Debt Metrics",
    description: "Portfolio P/E (harmonic mean) vs Category P/E, Average Maturity, YTM vs Category YTM — for both equity and debt funds.",
  },
  {
    icon: Info,
    title: "Complete Fund Info",
    description: "Benchmark, Fund Manager, AMC, Inception, Exit Load, Lock-in, Min Lumpsum/SIP, Base & Total TER, SEBI Riskometer level.",
  },
  {
    icon: Filter,
    title: "Screener (Coming Soon)",
    description: "Filter and sort by any metric. Save screens. SIP calculators. Watchlists with alerts.",
  },
  {
    icon: Database,
    title: "Precomputed, Not Scraped",
    description: "All metrics computed nightly from AMFI NAV history, mfapi.in, and NSE/BSE TRI indices. Stored in PostgreSQL — never computed on request.",
  },
  {
    icon: Zap,
    title: "Fast & Cached",
    description: "FastAPI backend with Redis caching. Next.js frontend with TanStack Query. Sub-100ms API responses for compare endpoint.",
  },
  {
    icon: Globe,
    title: "Public Data Only",
    description: "AMFI NAVAll.txt, mfapi.in, NSE/BSE TRI downloads, AMC monthly disclosures. No proprietary sources. No Tickertape scraping.",
  },
  {
    icon: Lock,
    title: "Neutral, No Advice",
    description: "Nivo provides facts and comparisons, not buy/sell recommendations. SEBI RIA disclaimer on every page. You decide.",
  },
]

export function Features() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything You Need to Compare Funds
          </h2>
          <p className="text-lg text-muted-foreground">
            35+ metrics across 5 categories. All precomputed. All from public data.
            Built for serious research, not quick tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className={cn(
                "group p-6 rounded-xl bg-card border transition-all hover:shadow-lg hover:border-primary/50",
                index < 3 && "lg:col-span-1"
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
              {feature.href && (
                <a
                  href={feature.href}
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                  Explore
                  <feature.icon className="h-3 w-3" />
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Metric Groups Overview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Metric Groups in Every Comparison</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {METRIC_GROUPS.map((group) => {
              const Icon = group.icon
              return (
                <div key={group.key} className="p-5 rounded-lg border bg-card/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{Icon}</span>
                    <div>
                      <h4 className="font-semibold">{group.label}</h4>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground border-t pt-3">
                    Expandable accordion in compare table • Tooltips on every metric • Sortable columns
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
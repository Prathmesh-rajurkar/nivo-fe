"use client"

import {
  Database,
  Cpu,
  Server,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    number: "01",
    icon: Database,
    title: "Data Ingestion",
    description: "Nightly cron pulls NAVAll.txt from AMFI, historical NAVs from mfapi.in, and benchmark TRI from NSE/BSE. Direct-Growth plans only.",
    details: ["AMFI NAVAll.txt (daily)", "mfapi.in (historical NAV)", "NSE/BSE TRI indices", "AMC portfolio disclosures (Phase 2)"],
  },
  {
    number: "02",
    icon: Cpu,
    title: "Metrics Engine",
    description: "Python engine computes all 35+ metrics per fund: returns, risk (alpha, beta, Sharpe, Sortino, drawdown), portfolio, valuation, and static info.",
    details: ["3-year trailing risk window", "252-day annualization", "OLS regression for alpha/beta", "Peer median for category comparison"],
  },
  {
    number: "03",
    icon: Server,
    title: "Precompute & Store",
    description: "Every metric upserted into fund_metrics table nightly. fund_metrics_latest view serves only the freshest row per scheme. Zero compute at request time.",
    details: ["PostgreSQL 16", "Single-row per scheme", "as_of_date for history", "Redis cache layer"],
  },
  {
    number: "04",
    icon: Globe,
    title: "API Layer",
    description: "FastAPI serves /search, /fund/{id}, /compare?ids= endpoints. Redis caches hot queries. OpenAPI docs auto-generated. Sub-100ms p95.",
    details: ["/api/v1/funds/search?q=", "/api/v1/funds/{scheme_id}", "/api/v1/funds/compare?ids=", "Rate limited, CORS enabled"],
  },
  {
    number: "05",
    icon: Zap,
    title: "Frontend",
    description: "Next.js 14 App Router with TanStack Query. Search autocomplete, fund detail with accordions, compare table with metric groups. MSW for dev.",
    details: ["TypeScript + Tailwind", "shadcn/ui (Radix)", "Recharts for visualizations", "Works offline with SW"],
  },
  {
    number: "06",
    icon: Shield,
    title: "You Decide",
    description: "Nivo shows facts, not opinions. No star ratings. No \"best fund\" badges. SEBI disclaimer on every page. Direct plans only — lower costs.",
    details: ["No buy/sell signals", "Direct plans only", "Public data sources cited", "Open source (planned)"],
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How Nivo Works
          </h2>
          <p className="text-lg text-muted-foreground">
            From raw NAV data to your comparison table — fully automated, transparent, and auditable.
          </p>
        </div>

        <div className="space-y-8">
          {STEPS.map((step, index) => (
            <article
              key={step.number}
              className={cn(
                "flex flex-col lg:flex-row gap-8 items-start p-6 rounded-xl border bg-card/50",
                index % 2 === 1 && "lg:flex-row-reverse"
              )}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center lg:w-20 lg:h-20">
                <span className="text-2xl lg:text-3xl font-bold text-primary font-mono">{step.number}</span>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {step.details.map((detail) => (
                    <span
                      key={detail}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div className="flex flex-col items-center lg:hidden">
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Data Quality Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: CheckCircle, label: "Direct Plans Only", desc: "Lower TER, no commission drag" },
            { icon: CheckCircle, label: "TRI Benchmarks", desc: "Total Return Index for accurate alpha" },
            { icon: CheckCircle, label: "Peer Median", desc: "Category comparison vs median, not mean" },
            { icon: CheckCircle, label: "Stale Data Flagged", desc: "NAV >10 days old = metrics suppressed" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg border bg-card/50 text-center">
              <div className="p-2 rounded-lg bg-green-100 text-green-700 inline-flex mb-3">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="font-medium mb-1">{item.label}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
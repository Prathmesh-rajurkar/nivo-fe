"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MetricCard, MetricRow } from "./metric-card"
import { METRIC_DEFS, METRIC_GROUPS, getMetricsByGroup, formatDate, formatCurrency, formatPercent, formatRatio, formatBps } from "@/lib/metric-defs"
import { cn } from "@/lib/utils"
import type { FundDetailResponse } from "@/lib/api-types"
import {
  TrendingUp,
  Shield,
  PieChart,
  DollarSign,
  Info,
  Building2,
  User,
  Calendar,
  Target,
  Percent,
  FileText,
  AlertTriangle,
} from "lucide-react"

const GROUP_ICONS: Record<string, any> = {
  returns: TrendingUp,
  risk: Shield,
  portfolio: PieChart,
  valuation: DollarSign,
  fundInfo: Info,
}

interface FundHeaderProps {
  fund: FundDetailResponse
}

function FundHeader({ fund }: FundHeaderProps) {
  const { static: s, metrics: m } = fund
  const riskLevel = s.sebi_risk_level
  const riskColors: Record<string, string> = {
    Low: "bg-green-100 text-green-800",
    "Low to Moderate": "bg-lime-100 text-lime-800",
    Moderate: "bg-yellow-100 text-yellow-800",
    "Moderately High": "bg-orange-100 text-orange-800",
    High: "bg-red-100 text-red-800",
    "Very High": "bg-red-200 text-red-900",
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold truncate">{s.name}</h1>
            <Badge variant="outline" className="text-xs">
              {s.plan} - {s.option_type}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{s.amc_name}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {s.sebi_category}
            </span>
            {s.benchmark_name && (
              <span className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {s.benchmark_name}
              </span>
            )}
            {s.fund_manager && (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {s.fund_manager}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 sm:ml-4">
          {m?.nav && (
            <div className="text-right">
              <div className="text-3xl font-bold font-mono">₹{m.nav.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">NAV as of {m.as_of_date ? formatDate(m.as_of_date) : "—"}</div>
            </div>
          )}
          {riskLevel && (
            <Badge className={cn("text-sm px-3 py-1.5", riskColors[riskLevel] || "bg-muted")}>
              <AlertTriangle className="h-3 w-3 mr-1" />
              {riskLevel}
            </Badge>
          )}
        </div>
      </div>

      {/* Key Metrics Row */}
      {m && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <MetricCard
            def={{ key: "ret_1y", label: "1Y Return", format: formatPercent, group: "returns", tooltip: "", sortDirection: "desc" }}
            value={m.ret_1y}
            compact
          />
          <MetricCard
            def={{ key: "cagr_3y", label: "3Y CAGR", format: formatPercent, group: "returns", tooltip: "", sortDirection: "desc" }}
            value={m.cagr_3y}
            compact
          />
          <MetricCard
            def={{ key: "cagr_5y", label: "5Y CAGR", format: formatPercent, group: "returns", tooltip: "", sortDirection: "desc" }}
            value={m.cagr_5y}
            compact
          />
          <MetricCard
            def={{ key: "sharpe_ratio", label: "Sharpe", format: formatRatio, group: "risk", tooltip: "", sortDirection: "desc" }}
            value={m.sharpe_ratio}
            compact
          />
          <MetricCard
            def={{ key: "max_drawdown", label: "Max DD", format: formatPercent, group: "risk", tooltip: "", sortDirection: "asc" }}
            value={m.max_drawdown}
            compact
          />
          <MetricCard
            def={{ key: "total_expense_ratio", label: "Expense Ratio", format: formatBps, group: "fundInfo", tooltip: "", sortDirection: "asc" }}
            value={s.total_expense_ratio}
            compact
          />
        </div>
      )}

      <Separator />
    </div>
  )
}

interface MetricGroupAccordionProps {
  group: (typeof METRIC_GROUPS)[0]
  fund: FundDetailResponse
}

function MetricGroupAccordion({ group, fund }: MetricGroupAccordionProps) {
  const { static: s, metrics: m } = fund
  const metricDefs = getMetricsByGroup(group.key)

  // Merge metrics and static for lookup
  const data = {
    ...s,
    ...m,
    nav: m?.nav ?? null,
  }

  const visibleMetrics = metricDefs.filter((def) => {
    const value = (data as any)[def.key]
    return value !== null && value !== undefined
  })

  if (visibleMetrics.length === 0) return null

  const Icon = GROUP_ICONS[group.key] || Info

  return (
    <AccordionItem value={group.key}>
      <AccordionTrigger className="flex items-center gap-3 px-4 py-3 bg-muted/30">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <div className="flex-1 text-left">
          <span className="font-medium">{group.label}</span>
          <div className="text-xs text-muted-foreground">{group.description}</div>
        </div>
        <span className="text-sm text-muted-foreground">{visibleMetrics.length} metrics</span>
      </AccordionTrigger>
      <AccordionContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
          {visibleMetrics.map((def) => {
            const value = (data as any)[def.key]
            return (
              <MetricCard key={def.key} def={def} value={value} />
            )
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export function FundDetail({ fund }: { fund: FundDetailResponse }) {
  const { static: s } = fund

  return (
    <div className="space-y-6">
      <FundHeader fund={fund} />

      {/* Static Info Section */}
      <Accordion type="single" className="space-y-2">
        <AccordionItem value="static">
          <AccordionTrigger className="flex items-center gap-3 px-4 py-3 bg-muted/30">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 text-left">
              <span className="font-medium">Fund Details</span>
              <div className="text-xs text-muted-foreground">Basic information, costs, and regulatory details</div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-0">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {[
                { label: "AMC", value: s.amc_name, icon: Building2 },
                { label: "Category", value: s.sebi_category, icon: Percent },
                { label: "Plan", value: `${s.plan} - ${s.option_type}`, icon: Target },
                { label: "Inception", value: s.inception_date ? formatDate(s.inception_date) : "—", icon: Calendar },
                { label: "Benchmark", value: s.benchmark_name ?? "—", icon: Target },
                { label: "Fund Manager", value: s.fund_manager ?? "—", icon: User },
                { label: "Exit Load", value: s.exit_load ?? "None", icon: AlertTriangle },
                { label: "Lock-in", value: s.lock_in_period ?? "None", icon: AlertTriangle },
                { label: "Min Lumpsum", value: s.min_lumpsum ? formatCurrency(s.min_lumpsum) : "—", icon: DollarSign },
                { label: "Min SIP", value: s.min_sip ? formatCurrency(s.min_sip) : "—", icon: DollarSign },
                { label: "SIP Available", value: s.sip_available ? "Yes" : "No", icon: Target },
                { label: "Base TER", value: s.base_expense_ratio ? formatBps(s.base_expense_ratio) : "—", icon: FileText },
                { label: "Total TER", value: s.total_expense_ratio ? formatBps(s.total_expense_ratio) : "—", icon: FileText },
                { label: "SEBI Risk", value: s.sebi_risk_level ?? "—", icon: AlertTriangle },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <item.icon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs text-muted-foreground">{item.label}</dt>
                    <dd className="font-medium text-sm">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>

        {/* Dynamic Metric Groups */}
        {METRIC_GROUPS.map((group) => (
          <MetricGroupAccordion key={group.key} group={group} fund={fund} />
        ))}
      </Accordion>

      {/* Disclaimer */}
      <div className="p-4 rounded-lg bg-muted/50 border text-xs text-muted-foreground">
        <p className="font-medium mb-1">Disclaimer</p>
        <p>
          Nivo provides factual data and comparisons for mutual fund research. This is not investment advice.
          Past performance is not indicative of future returns. Please consult a SEBI-registered investment advisor
          before making investment decisions. Data sourced from AMFI, mfapi.in, and public disclosures.
        </p>
      </div>
    </div>
  )
}
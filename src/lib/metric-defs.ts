/**
 * Metric definitions for display formatting, tooltips, and grouping.
 * Matches the metric groups from the product brief.
 */

import type { FundMetrics } from "./api-types"

export type MetricGroup = "returns" | "risk" | "portfolio" | "valuation" | "fundInfo"

export interface MetricDef {
  key: keyof FundMetrics | "nav" | "inception_date" | "benchmark_name" | "fund_manager" | "exit_load" | "lock_in_period" | "min_lumpsum" | "min_sip" | "sip_available" | "base_expense_ratio" | "total_expense_ratio" | "sebi_risk_level" | "amc_name"
  label: string
  shortLabel?: string
  tooltip: string
  group: MetricGroup
  format: (value: unknown) => string
  sortDirection: "asc" | "desc" // Higher is better (desc) or lower is better (asc)
  isPercentage?: boolean
  showInCompare?: boolean
}

const formatPercent = (value: unknown) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—"
  return `${(value * 100).toFixed(2)}%`
}

const formatRatio = (value: unknown) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—"
  return value.toFixed(2)
}

const formatNumber = (value: unknown) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—"
  return value.toFixed(2)
}

const formatCurrency = (value: unknown) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—"
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value)
}

const formatRaw = (value: unknown) => {
  if (value === null || value === undefined) return "—"
  return String(value)
}

const formatDate = (value: unknown) => {
  if (value === null || value === undefined) return "—"
  return new Date(value as string | Date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

const formatBps = (value: unknown) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—"
  return `${(value * 10000).toFixed(0)} bps`
}

// Export formatters for external use
export { formatPercent, formatRatio, formatNumber, formatCurrency, formatRaw, formatDate, formatBps }

// ============================================
// Metric Definitions - grouped by category
// ============================================

export const METRIC_DEFS: MetricDef[] = [
  // ---- RETURNS ----
  {
    key: "ret_3m",
    label: "3M Return",
    shortLabel: "3M",
    tooltip: "Absolute return over the last 3 months. NAV_end / NAV_start - 1.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "ret_6m",
    label: "6M Return",
    shortLabel: "6M",
    tooltip: "Absolute return over the last 6 months.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "ret_1y",
    label: "1Y Return",
    shortLabel: "1Y",
    tooltip: "Absolute return over the last 1 year.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "cagr_3y",
    label: "3Y CAGR",
    shortLabel: "3Y CAGR",
    tooltip: "Compound Annual Growth Rate over 3 years. (NAV_end / NAV_start)^(1/3) - 1.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "cagr_5y",
    label: "5Y CAGR",
    shortLabel: "5Y CAGR",
    tooltip: "Compound Annual Growth Rate over 5 years.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "cagr_10y",
    label: "10Y CAGR",
    shortLabel: "10Y CAGR",
    tooltip: "Compound Annual Growth Rate over 10 years.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "rolling_3y_avg",
    label: "3Y Avg Rolling Return",
    shortLabel: "3Y Rolling",
    tooltip: "Average of all 3-year forward CAGRs computed daily. Smooths out timing luck.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "ret_vs_cat_1y",
    label: "1Y vs Category",
    shortLabel: "vs Cat 1Y",
    tooltip: "Fund return minus peer median return (same SEBI category). Positive = outperformed.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "ret_vs_cat_3y",
    label: "3Y vs Category",
    shortLabel: "vs Cat 3Y",
    tooltip: "Fund 3Y CAGR minus peer median 3Y CAGR.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "ret_vs_cat_5y",
    label: "5Y vs Category",
    shortLabel: "vs Cat 5Y",
    tooltip: "Fund 5Y CAGR minus peer median 5Y CAGR.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "ret_vs_cat_10y",
    label: "10Y vs Category",
    shortLabel: "vs Cat 10Y",
    tooltip: "Fund 10Y CAGR minus peer median 10Y CAGR.",
    group: "returns",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },

  // ---- RISK ----
  {
    key: "alpha",
    label: "Alpha (Annualized)",
    shortLabel: "Alpha",
    tooltip: "Jensen's Alpha: excess return vs benchmark after adjusting for beta. Intercept × 252 from daily regression.",
    group: "risk",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "beta",
    label: "Beta",
    shortLabel: "Beta",
    tooltip: "Sensitivity to benchmark. >1 = more volatile than benchmark, <1 = less.",
    group: "risk",
    format: formatRatio,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "volatility",
    label: "Volatility (Annualized)",
    shortLabel: "Volatility",
    tooltip: "Standard deviation of daily returns × √252. Measures total risk.",
    group: "risk",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "sharpe_ratio",
    label: "Sharpe Ratio",
    shortLabel: "Sharpe",
    tooltip: "Return per unit of total risk. (Mean excess return × 252) / (StdDev × √252). RFR = 6.5%.",
    group: "risk",
    format: formatRatio,
    sortDirection: "desc",
    showInCompare: true,
  },
  {
    key: "sortino_ratio",
    label: "Sortino Ratio",
    shortLabel: "Sortino",
    tooltip: "Return per unit of downside risk. Uses downside deviation instead of total volatility.",
    group: "risk",
    format: formatRatio,
    sortDirection: "desc",
    showInCompare: true,
  },
  {
    key: "max_drawdown",
    label: "Max Drawdown",
    shortLabel: "Max DD",
    tooltip: "Largest peak-to-trough decline in the last 3 years. Closer to 0 is better.",
    group: "risk",
    format: formatPercent,
    sortDirection: "asc", // Less negative is better
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "tracking_error",
    label: "Tracking Error",
    shortLabel: "Tracking Err",
    tooltip: "StdDev of (fund return - benchmark return) × √252. How closely the fund follows its benchmark.",
    group: "risk",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "category_std_dev",
    label: "Category Std Dev",
    shortLabel: "Cat StDev",
    tooltip: "Average volatility of peer funds in the same SEBI category.",
    group: "risk",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "pct_from_ath",
    label: "% from All-Time High",
    shortLabel: "% from ATH",
    tooltip: "Current NAV / Highest NAV ever - 1. Negative means below peak.",
    group: "risk",
    format: formatPercent,
    sortDirection: "asc", // Closer to 0 is better
    isPercentage: true,
    showInCompare: true,
  },

  // ---- PORTFOLIO (Group B - placeholder) ----
  {
    key: "equity_pct",
    label: "Equity %",
    shortLabel: "Equity",
    tooltip: "Percentage of portfolio in equities.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "debt_pct",
    label: "Debt %",
    shortLabel: "Debt",
    tooltip: "Percentage of portfolio in debt instruments.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "cash_pct",
    label: "Cash & Other %",
    shortLabel: "Cash",
    tooltip: "Percentage in cash, money market, and other assets.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "largecap_pct",
    label: "Large Cap %",
    shortLabel: "Large Cap",
    tooltip: "Equity allocation to large-cap stocks (top 100 by market cap).",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "midcap_pct",
    label: "Mid Cap %",
    shortLabel: "Mid Cap",
    tooltip: "Equity allocation to mid-cap stocks (101-250 by market cap).",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "smallcap_pct",
    label: "Small Cap %",
    shortLabel: "Small Cap",
    tooltip: "Equity allocation to small-cap stocks (251+ by market cap).",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "top3_concentration",
    label: "Top 3 Holdings %",
    shortLabel: "Top 3",
    tooltip: "Combined weight of the 3 largest holdings. Higher = more concentrated.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "top5_concentration",
    label: "Top 5 Holdings %",
    shortLabel: "Top 5",
    tooltip: "Combined weight of the 5 largest holdings.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "top10_concentration",
    label: "Top 10 Holdings %",
    shortLabel: "Top 10",
    tooltip: "Combined weight of the 10 largest holdings.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "sovereign_debt_pct",
    label: "Sovereign Debt %",
    shortLabel: "Sovereign",
    tooltip: "Debt allocation to government securities.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "corporate_debt_pct",
    label: "Corporate Debt %",
    shortLabel: "Corporate",
    tooltip: "Debt allocation to corporate bonds.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "bonds_rated_a_pct",
    label: "A+ Rated Bonds %",
    shortLabel: "A+ Rated",
    tooltip: "Percentage of debt in highest-rated bonds (AAA/AA equivalent).",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "bonds_rated_b_pct",
    label: "B Rated Bonds %",
    shortLabel: "B Rated",
    tooltip: "Percentage in lower-rated bonds (A/BBB equivalent).",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "bonds_poorly_rated_pct",
    label: "Poorly Rated Bonds %",
    shortLabel: "Poor Rated",
    tooltip: "Percentage in below-investment-grade or unrated debt.",
    group: "portfolio",
    format: formatPercent,
    sortDirection: "asc",
    isPercentage: true,
    showInCompare: true,
  },

  // ---- VALUATION ----
  {
    key: "pe_ratio",
    label: "Portfolio P/E",
    shortLabel: "P/E",
    tooltip: "Weighted harmonic mean P/E of equity holdings. Lower = cheaper.",
    group: "valuation",
    format: formatRatio,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "category_pe_ratio",
    label: "Category P/E",
    shortLabel: "Cat P/E",
    tooltip: "Median portfolio P/E of peer funds in the same category.",
    group: "valuation",
    format: formatRatio,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "avg_maturity",
    label: "Avg Maturity (Years)",
    shortLabel: "Avg Maturity",
    tooltip: "Weighted average maturity of debt holdings. Higher = more interest rate sensitivity.",
    group: "valuation",
    format: formatNumber,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "avg_ytm",
    label: "Avg YTM",
    shortLabel: "YTM",
    tooltip: "Weighted average yield to maturity of debt portfolio. Annualized return if held to maturity.",
    group: "valuation",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },
  {
    key: "category_ytm",
    label: "Category YTM",
    shortLabel: "Cat YTM",
    tooltip: "Median YTM of peer debt funds in the same category.",
    group: "valuation",
    format: formatPercent,
    sortDirection: "desc",
    isPercentage: true,
    showInCompare: true,
  },

  // ---- FUND INFO (Static/Group C) ----
  {
    key: "nav",
    label: "NAV",
    shortLabel: "NAV",
    tooltip: "Latest Net Asset Value per unit.",
    group: "fundInfo",
    format: (v) => (typeof v === "number" ? `₹${v.toFixed(2)}` : "—"),
    sortDirection: "desc",
    showInCompare: true,
  },
  {
    key: "inception_date",
    label: "Inception Date",
    shortLabel: "Inception",
    tooltip: "Date the fund was launched.",
    group: "fundInfo",
    format: formatDate,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "benchmark_name",
    label: "Benchmark",
    shortLabel: "Benchmark",
    tooltip: "Index the fund is benchmarked against (TRI version used for calculations).",
    group: "fundInfo",
    format: formatRaw,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "fund_manager",
    label: "Fund Manager",
    shortLabel: "Manager",
    tooltip: "Current fund manager(s) as per factsheet.",
    group: "fundInfo",
    format: formatRaw,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "amc_name",
    label: "AMC",
    shortLabel: "AMC",
    tooltip: "Asset Management Company.",
    group: "fundInfo",
    format: formatRaw,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "exit_load",
    label: "Exit Load",
    shortLabel: "Exit Load",
    tooltip: "Fee charged on early redemption. Usually a percentage if redeemed within a period.",
    group: "fundInfo",
    format: formatRaw,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "lock_in_period",
    label: "Lock-in Period",
    shortLabel: "Lock-in",
    tooltip: "Minimum holding period before redemption is allowed (e.g., ELSS = 3 years).",
    group: "fundInfo",
    format: formatRaw,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "min_lumpsum",
    label: "Min Lumpsum",
    shortLabel: "Min Lump",
    tooltip: "Minimum one-time investment amount.",
    group: "fundInfo",
    format: formatCurrency,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "min_sip",
    label: "Min SIP",
    shortLabel: "Min SIP",
    tooltip: "Minimum Systematic Investment Plan installment.",
    group: "fundInfo",
    format: formatCurrency,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "sip_available",
    label: "SIP Available",
    shortLabel: "SIP",
    tooltip: "Whether SIP investment is offered.",
    group: "fundInfo",
    format: (v) => (typeof v === "boolean" ? (v ? "Yes" : "No") : "—"),
    sortDirection: "desc",
    showInCompare: true,
  },
  {
    key: "base_expense_ratio",
    label: "Base Expense Ratio",
    shortLabel: "Base TER",
    tooltip: "Ongoing management fee (excludes GST, transaction costs). Direct plan.",
    group: "fundInfo",
    format: formatBps,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "total_expense_ratio",
    label: "Total Expense Ratio",
    shortLabel: "Total TER",
    tooltip: "All-in cost including GST and other charges. Direct plan.",
    group: "fundInfo",
    format: formatBps,
    sortDirection: "asc",
    showInCompare: true,
  },
  {
    key: "sebi_risk_level",
    label: "SEBI Risk Level",
    shortLabel: "Risk",
    tooltip: "Riskometer category as per SEBI: Low → Very High.",
    group: "fundInfo",
    format: formatRaw,
    sortDirection: "asc",
    showInCompare: true,
  },
]

// ============================================
// Group metadata for accordions
// ============================================
export const METRIC_GROUPS: { key: MetricGroup; label: string; description: string; icon: string }[] = [
  {
    key: "returns",
    label: "Returns",
    description: "Absolute returns, CAGR, rolling returns, and performance vs peers",
    icon: "📈",
  },
  {
    key: "risk",
    label: "Risk & Performance",
    description: "Alpha, beta, volatility, Sharpe, Sortino, drawdown, tracking error",
    icon: "🛡️",
  },
  {
    key: "portfolio",
    label: "Portfolio Composition",
    description: "Asset allocation, market cap split, concentration, debt quality",
    icon: "📊",
  },
  {
    key: "valuation",
    label: "Valuation & Debt Metrics",
    description: "P/E ratios, average maturity, YTM, category comparisons",
    icon: "💰",
  },
  {
    key: "fundInfo",
    label: "Fund Information",
    description: "NAV, benchmark, manager, costs, exit load, minimums, risk rating",
    icon: "ℹ️",
  },
]

// ============================================
// Helpers
// ============================================
export function getMetricsByGroup(group: MetricGroup): MetricDef[] {
  return METRIC_DEFS.filter((m) => m.group === group)
}

export function getCompareMetrics(): MetricDef[] {
  return METRIC_DEFS.filter((m) => m.showInCompare)
}

export function getMetricDef(key: string): MetricDef | undefined {
  return METRIC_DEFS.find((m) => m.key === key)
}
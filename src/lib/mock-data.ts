/**
 * Mock data generator for Nivo frontend development.
 * Generates realistic fund data across categories with all metrics from the brief.
 * All percentages stored as decimals (0.12 = 12%).
 */

import type {
  FundStatic,
  FundMetrics,
  FundDetailResponse,
  FundSearchResult,
  CompareResponse,
  CategoryInfo,
} from "./api-types"

// ============================================
// Seed Data: Real-world inspired funds
// ============================================
const FUND_SEEDS = [
  {
    scheme_id: "HDFC_FLEXI_CAP_DIRECT_GROWTH",
    amfi_code: 118834,
    name: "HDFC Flexi Cap Fund - Direct Plan - Growth",
    amc_name: "HDFC Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Equity Scheme - Flexi Cap Fund",
    sebi_category: "Flexi Cap Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2013-01-01",
    benchmark_name: "NIFTY 500 TRI",
    fund_manager: "Prashant Jain",
    exit_load: "1% if redeemed within 1 year",
    lock_in_period: null,
    min_lumpsum: 100,
    min_sip: 500,
    sip_available: true,
    base_expense_ratio: 0.0082,
    total_expense_ratio: 0.0082,
    sebi_risk_level: "Very High" as const,
    avg_maturity: null,
    avg_ytm: null,
  },
  {
    scheme_id: "NIPPON_INDIA_SMALL_CAP_DIRECT_GROWTH",
    amfi_code: 118825,
    name: "Nippon India Small Cap Fund - Direct Plan - Growth",
    amc_name: "Nippon India Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Equity Scheme - Small Cap Fund",
    sebi_category: "Small Cap Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2010-09-16",
    benchmark_name: "NIFTY Smallcap 250 TRI",
    fund_manager: "Samir Rachh",
    exit_load: "1% if redeemed within 1 year",
    lock_in_period: null,
    min_lumpsum: 100,
    min_sip: 500,
    sip_available: true,
    base_expense_ratio: 0.0095,
    total_expense_ratio: 0.0095,
    sebi_risk_level: "Very High" as const,
    avg_maturity: null,
    avg_ytm: null,
  },
  {
    scheme_id: "ICICI_PRU_BLUECHIP_DIRECT_GROWTH",
    amfi_code: 118812,
    name: "ICICI Prudential Bluechip Fund - Direct Plan - Growth",
    amc_name: "ICICI Prudential Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Equity Scheme - Large Cap Fund",
    sebi_category: "Large Cap Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2008-05-23",
    benchmark_name: "NIFTY 100 TRI",
    fund_manager: "Anish Tawakley",
    exit_load: "1% if redeemed within 1 year",
    lock_in_period: null,
    min_lumpsum: 100,
    min_sip: 100,
    sip_available: true,
    base_expense_ratio: 0.0072,
    total_expense_ratio: 0.0072,
    sebi_risk_level: "Very High" as const,
    avg_maturity: null,
    avg_ytm: null,
  },
  {
    scheme_id: "QUANT_SMALL_CAP_DIRECT_GROWTH",
    amfi_code: 118856,
    name: "Quant Small Cap Fund - Direct Plan - Growth",
    amc_name: "Quant Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Equity Scheme - Small Cap Fund",
    sebi_category: "Small Cap Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2013-11-11",
    benchmark_name: "NIFTY Smallcap 250 TRI",
    fund_manager: "Ankit Pande",
    exit_load: "1% if redeemed within 1 year",
    lock_in_period: null,
    min_lumpsum: 1000,
    min_sip: 500,
    sip_available: true,
    base_expense_ratio: 0.0062,
    total_expense_ratio: 0.0062,
    sebi_risk_level: "Very High" as const,
    avg_maturity: null,
    avg_ytm: null,
  },
  {
    scheme_id: "PARAG_PARIKH_FLEXI_CAP_DIRECT_GROWTH",
    amfi_code: 118845,
    name: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
    amc_name: "PPFAS Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Equity Scheme - Flexi Cap Fund",
    sebi_category: "Flexi Cap Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2013-05-24",
    benchmark_name: "NIFTY 500 TRI",
    fund_manager: "Rajeev Thakkar",
    exit_load: "2% if redeemed within 30 days, 1% within 1 year",
    lock_in_period: null,
    min_lumpsum: 1000,
    min_sip: 1000,
    sip_available: true,
    base_expense_ratio: 0.0048,
    total_expense_ratio: 0.0048,
    sebi_risk_level: "Very High" as const,
    avg_maturity: null,
    avg_ytm: null,
  },
  {
    scheme_id: "SBI_SMALL_CAP_DIRECT_GROWTH",
    amfi_code: 118867,
    name: "SBI Small Cap Fund - Direct Plan - Growth",
    amc_name: "SBI Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Equity Scheme - Small Cap Fund",
    sebi_category: "Small Cap Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2009-09-09",
    benchmark_name: "NIFTY Smallcap 250 TRI",
    fund_manager: "R. Srinivasan",
    exit_load: "1% if redeemed within 1 year",
    lock_in_period: null,
    min_lumpsum: 5000,
    min_sip: 500,
    sip_available: true,
    base_expense_ratio: 0.0078,
    total_expense_ratio: 0.0078,
    sebi_risk_level: "Very High" as const,
    avg_maturity: null,
    avg_ytm: null,
  },
  {
    scheme_id: "MIRAE_ASSET_LARGE_CAP_DIRECT_GROWTH",
    amfi_code: 118878,
    name: "Mirae Asset Large Cap Fund - Direct Plan - Growth",
    amc_name: "Mirae Asset Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Equity Scheme - Large Cap Fund",
    sebi_category: "Large Cap Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2008-04-04",
    benchmark_name: "NIFTY 100 TRI",
    fund_manager: "Gaurav Misra",
    exit_load: "1% if redeemed within 365 days",
    lock_in_period: null,
    min_lumpsum: 5000,
    min_sip: 1000,
    sip_available: true,
    base_expense_ratio: 0.0052,
    total_expense_ratio: 0.0052,
    sebi_risk_level: "Very High" as const,
    avg_maturity: null,
    avg_ytm: null,
  },
  {
    scheme_id: "AXIS_MIDCAP_DIRECT_GROWTH",
    amfi_code: 118889,
    name: "Axis Midcap Fund - Direct Plan - Growth",
    amc_name: "Axis Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Equity Scheme - Mid Cap Fund",
    sebi_category: "Mid Cap Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2011-02-18",
    benchmark_name: "NIFTY Midcap 150 TRI",
    fund_manager: "Shreyash Devalkar",
    exit_load: "1% if redeemed within 12 months",
    lock_in_period: null,
    min_lumpsum: 5000,
    min_sip: 500,
    sip_available: true,
    base_expense_ratio: 0.0055,
    total_expense_ratio: 0.0055,
    sebi_risk_level: "Very High" as const,
    avg_maturity: null,
    avg_ytm: null,
  },
  {
    scheme_id: "KOTAK_EQUITY_HYBRID_DIRECT_GROWTH",
    amfi_code: 118890,
    name: "Kotak Equity Hybrid Fund - Direct Plan - Growth",
    amc_name: "Kotak Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Hybrid Scheme - Aggressive Hybrid Fund",
    sebi_category: "Aggressive Hybrid Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2003-11-03",
    benchmark_name: "CRISIL Hybrid 35+65 Aggressive Index",
    fund_manager: "Harsha Upadhyaya",
    exit_load: "1% if redeemed within 1 year",
    lock_in_period: null,
    min_lumpsum: 5000,
    min_sip: 500,
    sip_available: true,
    base_expense_ratio: 0.0068,
    total_expense_ratio: 0.0068,
    sebi_risk_level: "High" as const,
    avg_maturity: 4.2,
    avg_ytm: 0.0725,
  },
  {
    scheme_id: "HDFC_CORPORATE_BOND_DIRECT_GROWTH",
    amfi_code: 118891,
    name: "HDFC Corporate Bond Fund - Direct Plan - Growth",
    amc_name: "HDFC Mutual Fund",
    scheme_type: "Open Ended",
    amfi_category: "Debt Scheme - Corporate Bond Fund",
    sebi_category: "Corporate Bond Fund",
    plan: "Direct" as const,
    option_type: "Growth" as const,
    inception_date: "2010-06-29",
    benchmark_name: "NIFTY Corporate Bond Index",
    fund_manager: "Anil Bamboli",
    exit_load: "Nil",
    lock_in_period: null,
    min_lumpsum: 5000,
    min_sip: 500,
    sip_available: true,
    base_expense_ratio: 0.0032,
    total_expense_ratio: 0.0032,
    sebi_risk_level: "Moderate" as const,
    avg_maturity: 3.8,
    avg_ytm: 0.0758,
  },
]

const NAV_BASE = {
  "HDFC_FLEXI_CAP_DIRECT_GROWTH": 145.23,
  "NIPPON_INDIA_SMALL_CAP_DIRECT_GROWTH": 189.45,
  "ICICI_PRU_BLUECHIP_DIRECT_GROWTH": 89.12,
  "QUANT_SMALL_CAP_DIRECT_GROWTH": 167.89,
  "PARAG_PARIKH_FLEXI_CAP_DIRECT_GROWTH": 76.34,
  "SBI_SMALL_CAP_DIRECT_GROWTH": 156.78,
  "MIRAE_ASSET_LARGE_CAP_DIRECT_GROWTH": 98.56,
  "AXIS_MIDCAP_DIRECT_GROWTH": 87.45,
  "KOTAK_EQUITY_HYBRID_DIRECT_GROWTH": 54.32,
  "HDFC_CORPORATE_BOND_DIRECT_GROWTH": 28.91,
}

// ============================================
// Helper: Seeded random for consistent mock data
// ============================================
function seededRandom(seed: string): () => number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash |= 0
  }
  return () => {
    hash = (hash * 16807) % 2147483647
    return (hash - 1) / 2147483646
  }
}

function randNormal(rng: () => number, mean = 0, std = 1): number {
  // Box-Muller transform
  const u1 = rng()
  const u2 = rng()
  return mean + std * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

// ============================================
// Generate metrics with realistic correlations
// ============================================
function generateMetrics(seed: string, category: string, isDebt: boolean): FundMetrics {
  const rng = seededRandom(seed + "_metrics")
  const isEquity = !isDebt

  // Base returns vary by category
  const categoryReturnBias: Record<string, number> = {
    "Small Cap Fund": 0.04,
    "Mid Cap Fund": 0.025,
    "Flexi Cap Fund": 0.015,
    "Large Cap Fund": 0.01,
    "Aggressive Hybrid Fund": 0.005,
    "Corporate Bond Fund": -0.02,
  }
  const bias = categoryReturnBias[category] ?? 0

  // Returns (equity higher, debt lower)
  const baseReturn = isEquity ? 0.12 + bias : 0.07
  const vol = isEquity ? 0.18 + randNormal(rng) * 0.04 : 0.03 + randNormal(rng) * 0.01

  // Absolute returns (recent performance)
  const ret_3m = clamp(baseReturn / 4 + randNormal(rng) * 0.08, -0.3, 0.3)
  const ret_6m = clamp(baseReturn / 2 + randNormal(rng) * 0.06, -0.25, 0.25)
  const ret_1y = clamp(baseReturn + randNormal(rng) * 0.05, -0.2, 0.4)

  // CAGR (longer term more stable)
  const cagr_3y = clamp(baseReturn + randNormal(rng) * 0.03, -0.1, 0.3)
  const cagr_5y = clamp(baseReturn + randNormal(rng) * 0.025, -0.05, 0.25)
  const cagr_10y = clamp(baseReturn * 0.9 + randNormal(rng) * 0.02, 0.02, 0.2)

  // Rolling 3Y avg
  const rolling_3y_avg = clamp(cagr_3y + randNormal(rng) * 0.015, -0.05, 0.28)

  // vs Category (some outperform, some underperform)
  const ret_vs_cat_1y = clamp(randNormal(rng) * 0.03, -0.1, 0.1)
  const ret_vs_cat_3y = clamp(randNormal(rng) * 0.025, -0.08, 0.08)
  const ret_vs_cat_5y = clamp(randNormal(rng) * 0.02, -0.06, 0.06)
  const ret_vs_cat_10y = clamp(randNormal(rng) * 0.015, -0.04, 0.04)

  // Risk metrics
  const volatility = clamp(vol, 0.05, 0.45)
  const sharpe_ratio = isEquity
    ? clamp((baseReturn - 0.065) / volatility + randNormal(rng) * 0.2, -0.5, 2.5)
    : clamp((baseReturn - 0.065) / volatility + randNormal(rng) * 0.1, -0.2, 1.5)

  const sortino_ratio = sharpe_ratio * clamp(1 + randNormal(rng) * 0.15, 0.7, 1.5)
  const max_drawdown = isEquity
    ? -clamp(Math.abs(randNormal(rng) * 0.15) + 0.08, 0.05, 0.45)
    : -clamp(Math.abs(randNormal(rng) * 0.03) + 0.01, 0.005, 0.08)

  const tracking_error = isEquity
    ? clamp(Math.abs(randNormal(rng) * 0.04) + 0.02, 0.01, 0.15)
    : clamp(Math.abs(randNormal(rng) * 0.01) + 0.005, 0.002, 0.05)

  const beta = isEquity ? clamp(0.9 + randNormal(rng) * 0.15, 0.6, 1.4) : clamp(0.3 + randNormal(rng) * 0.1, 0.1, 0.6)
  const alpha = clamp((baseReturn - 0.065) - beta * (0.11 - 0.065) + randNormal(rng) * 0.02, -0.05, 0.08)

  const category_std_dev = volatility * clamp(0.95 + randNormal(rng) * 0.08, 0.8, 1.2)
  const pct_from_ath = -clamp(Math.abs(randNormal(rng) * 0.08), 0, 0.25)

  // Portfolio (equity funds)
  let equity_pct: number | null = null
  let debt_pct: number | null = null
  let cash_pct: number | null = null
  let largecap_pct: number | null = null
  let midcap_pct: number | null = null
  let smallcap_pct: number | null = null
  let top3_concentration: number | null = null
  let top5_concentration: number | null = null
  let top10_concentration: number | null = null
  let sovereign_debt_pct: number | null = null
  let corporate_debt_pct: number | null = null
  let bonds_rated_a_pct: number | null = null
  let bonds_rated_b_pct: number | null = null
  let bonds_poorly_rated_pct: number | null = null

  if (isEquity) {
    equity_pct = clamp(90 + randNormal(rng) * 5, 65, 99)
    cash_pct = clamp(100 - equity_pct - (debt_pct ?? 0), 0, 10)
    debt_pct = 100 - equity_pct - cash_pct

    // Cap allocation varies by category
    if (category === "Large Cap Fund") {
      largecap_pct = clamp(80 + randNormal(rng) * 8, 60, 95)
      midcap_pct = clamp(15 + randNormal(rng) * 5, 5, 30)
      smallcap_pct = clamp(5 + randNormal(rng) * 3, 0, 15)
    } else if (category === "Mid Cap Fund") {
      largecap_pct = clamp(20 + randNormal(rng) * 10, 10, 40)
      midcap_pct = clamp(65 + randNormal(rng) * 10, 45, 85)
      smallcap_pct = clamp(15 + randNormal(rng) * 5, 5, 30)
    } else if (category === "Small Cap Fund") {
      largecap_pct = clamp(10 + randNormal(rng) * 8, 0, 25)
      midcap_pct = clamp(20 + randNormal(rng) * 8, 5, 35)
      smallcap_pct = clamp(70 + randNormal(rng) * 10, 55, 95)
    } else if (category === "Flexi Cap Fund") {
      largecap_pct = clamp(50 + randNormal(rng) * 12, 30, 70)
      midcap_pct = clamp(30 + randNormal(rng) * 8, 15, 45)
      smallcap_pct = clamp(20 + randNormal(rng) * 8, 5, 35)
    } else if (category === "Aggressive Hybrid Fund") {
      equity_pct = clamp(70 + randNormal(rng) * 5, 65, 80)
      largecap_pct = clamp(55 + randNormal(rng) * 8, 40, 70)
      midcap_pct = clamp(25 + randNormal(rng) * 5, 15, 35)
      smallcap_pct = clamp(10 + randNormal(rng) * 4, 5, 20)
    }

    top3_concentration = clamp(15 + randNormal(rng) * 5, 8, 28)
    top5_concentration = clamp(top3_concentration + 8 + randNormal(rng) * 3, 18, 40)
    top10_concentration = clamp(top5_concentration + 10 + randNormal(rng) * 4, 30, 55)
  } else {
    // Debt fund
    debt_pct = clamp(92 + randNormal(rng) * 3, 80, 98)
    cash_pct = clamp(5 + randNormal(rng) * 3, 1, 15)
    equity_pct = 0
    sovereign_debt_pct = clamp(40 + randNormal(rng) * 15, 15, 70)
    corporate_debt_pct = 100 - sovereign_debt_pct - cash_pct
    bonds_rated_a_pct = clamp(60 + randNormal(rng) * 10, 40, 85)
    bonds_rated_b_pct = clamp(15 + randNormal(rng) * 5, 5, 25)
    bonds_poorly_rated_pct = clamp(5 + randNormal(rng) * 3, 0, 15)
  }

  // Valuation
  const pe_ratio = isEquity ? clamp(20 + randNormal(rng) * 6, 10, 40) : null
  const category_pe_ratio = isEquity ? clamp(pe_ratio! * (0.95 + randNormal(rng) * 0.08), 10, 40) : null
  const avg_ytm = isDebt ? clamp(0.072 + randNormal(rng) * 0.005, 0.06, 0.09) : null
  const category_ytm = isDebt ? clamp(avg_ytm! * (0.98 + randNormal(rng) * 0.03), 0.06, 0.09) : null
  const avg_maturity = isDebt ? clamp(3 + randNormal(rng) * 1.5, 1, 8) : null

  return {
    as_of_date: new Date().toISOString().split("T")[0],
    scheme_id: seed,
    nav: NAV_BASE[seed as keyof typeof NAV_BASE] ?? 100,
    // Returns
    ret_3m,
    ret_6m,
    ret_1y,
    cagr_3y,
    cagr_5y,
    cagr_10y,
    rolling_3y_avg,
    ret_vs_cat_1y,
    ret_vs_cat_3y,
    ret_vs_cat_5y,
    ret_vs_cat_10y,
    // Risk
    alpha,
    volatility,
    max_drawdown,
    sharpe_ratio,
    sortino_ratio,
    tracking_error,
    category_std_dev,
    pct_from_ath,
    beta,
    // Portfolio
    equity_pct: equity_pct ? equity_pct / 100 : null,
    debt_pct: debt_pct ? debt_pct / 100 : null,
    cash_pct: cash_pct ? cash_pct / 100 : null,
    largecap_pct: largecap_pct ? largecap_pct / 100 : null,
    midcap_pct: midcap_pct ? midcap_pct / 100 : null,
    smallcap_pct: smallcap_pct ? smallcap_pct / 100 : null,
    top3_concentration: top3_concentration ? top3_concentration / 100 : null,
    top5_concentration: top5_concentration ? top5_concentration / 100 : null,
    top10_concentration: top10_concentration ? top10_concentration / 100 : null,
    sovereign_debt_pct: sovereign_debt_pct ? sovereign_debt_pct / 100 : null,
    corporate_debt_pct: corporate_debt_pct ? corporate_debt_pct / 100 : null,
    bonds_rated_a_pct: bonds_rated_a_pct ? bonds_rated_a_pct / 100 : null,
    bonds_rated_b_pct: bonds_rated_b_pct ? bonds_rated_b_pct / 100 : null,
    bonds_poorly_rated_pct: bonds_poorly_rated_pct ? bonds_poorly_rated_pct / 100 : null,
    // Valuation
    pe_ratio,
    category_pe_ratio,
    avg_maturity,
    avg_ytm,
    category_ytm,
  }
}

// ============================================
// Build complete fund objects
// ============================================
export const MOCK_FUNDS: FundDetailResponse[] = FUND_SEEDS.map((seed) => {
  const isDebt = seed.sebi_category === "Corporate Bond Fund"
  return {
    static: { ...seed, is_active: true },
    metrics: generateMetrics(seed.scheme_id, seed.sebi_category, isDebt),
  }
})

export const MOCK_SEARCH_RESULTS: FundSearchResult[] = MOCK_FUNDS.map((f) => ({
  scheme_id: f.static.scheme_id,
  amfi_code: f.static.amfi_code,
  name: f.static.name,
  amc_name: f.static.amc_name,
  sebi_category: f.static.sebi_category,
  plan: f.static.plan,
  option_type: f.static.option_type,
  nav: f.metrics?.nav ?? null,
  nav_date: f.metrics?.as_of_date ?? null,
}))

export const MOCK_CATEGORIES: CategoryInfo[] = [
  { sebi_category: "Large Cap Fund", fund_count: 32 },
  { sebi_category: "Mid Cap Fund", fund_count: 28 },
  { sebi_category: "Small Cap Fund", fund_count: 24 },
  { sebi_category: "Flexi Cap Fund", fund_count: 42 },
  { sebi_category: "Aggressive Hybrid Fund", fund_count: 18 },
  { sebi_category: "Corporate Bond Fund", fund_count: 15 },
  { sebi_category: "Banking & PSU Fund", fund_count: 12 },
  { sebi_category: "Gilt Fund", fund_count: 8 },
]

// ============================================
// API Response Helpers
// ============================================
export function getFundById(schemeId: string): FundDetailResponse | undefined {
  return MOCK_FUNDS.find((f) => f.static.scheme_id === schemeId)
}

export function searchFunds(query: string, limit = 10): FundSearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return MOCK_SEARCH_RESULTS.slice(0, limit)
  return MOCK_SEARCH_RESULTS.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.amc_name.toLowerCase().includes(q) ||
      f.sebi_category.toLowerCase().includes(q) ||
      f.amfi_code.toString().includes(q)
  ).slice(0, limit)
}

export function compareFunds(ids: string[]): CompareResponse {
  const funds = ids.map((id) => getFundById(id)).filter(Boolean) as FundDetailResponse[]
  return { funds }
}
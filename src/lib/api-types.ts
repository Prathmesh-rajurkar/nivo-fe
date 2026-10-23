/**
 * API types for Nivo frontend.
 * Matches the metrics specified in the product brief (Group A + Group C).
 * All percentage values are stored as decimals (0.12 = 12%).
 */

// ============================================
// Fund Identification & Static Info (Group C)
// ============================================
export interface FundStatic {
  scheme_id: string
  amfi_code: number
  name: string
  amc_name: string
  scheme_type: string          // "Open Ended" / "Close Ended"
  amfi_category: string        // "Equity Scheme - Large Cap Fund"
  sebi_category: string        // "Large Cap Fund"
  plan: "Direct" | "Regular"
  option_type: "Growth" | "IDCW"
  inception_date: string       // ISO date
  is_active: boolean
  benchmark_name: string | null
  fund_manager: string | null
  exit_load: string | null     // Human-readable, e.g., "1% if redeemed within 1 year"
  lock_in_period: string | null // e.g., "3 years" or null
  min_lumpsum: number | null
  min_sip: number | null
  sip_available: boolean
  base_expense_ratio: number | null  // Decimal (0.005 = 0.5%)
  total_expense_ratio: number | null
  sebi_risk_level: "Low" | "Low to Moderate" | "Moderate" | "Moderately High" | "High" | "Very High" | null
  avg_maturity: number | null      // Years
  avg_ytm: number | null           // Decimal
}

// ============================================
// Returns Metrics
// ============================================
export interface ReturnsMetrics {
  // Absolute returns
  ret_3m: number | null
  ret_6m: number | null
  ret_1y: number | null
  // CAGR
  cagr_3y: number | null
  cagr_5y: number | null
  cagr_10y: number | null
  // Rolling
  rolling_3y_avg: number | null
  // vs Sub-category (peer median)
  ret_vs_cat_1y: number | null
  ret_vs_cat_3y: number | null
  ret_vs_cat_5y: number | null
  ret_vs_cat_10y: number | null
}

// ============================================
// Risk & Performance Metrics
// ============================================
export interface RiskMetrics {
  alpha: number | null
  volatility: number | null
  max_drawdown: number | null
  sharpe_ratio: number | null
  sortino_ratio: number | null
  tracking_error: number | null
  category_std_dev: number | null
  pct_from_ath: number | null
  beta: number | null
}

// ============================================
// Portfolio Composition Metrics (Group B - placeholder)
// ============================================
export interface PortfolioMetrics {
  equity_pct: number | null
  debt_pct: number | null
  cash_pct: number | null
  largecap_pct: number | null
  midcap_pct: number | null
  smallcap_pct: number | null
  top3_concentration: number | null
  top5_concentration: number | null
  top10_concentration: number | null
  sovereign_debt_pct: number | null
  corporate_debt_pct: number | null
  bonds_rated_a_pct: number | null
  bonds_rated_b_pct: number | null
  bonds_poorly_rated_pct: number | null
}

// ============================================
// Valuation & Debt Metrics
// ============================================
export interface ValuationMetrics {
  pe_ratio: number | null
  category_pe_ratio: number | null
  avg_maturity: number | null
  avg_ytm: number | null
  category_ytm: number | null
}

// ============================================
// Complete Fund Metrics (as stored in fund_metrics_latest view)
// ============================================
export interface FundMetrics
  extends ReturnsMetrics,
    RiskMetrics,
    PortfolioMetrics,
    ValuationMetrics {
  as_of_date: string
  nav: number | null
  scheme_id: string
}

// ============================================
// Combined Fund Detail Response
// ============================================
export interface FundDetailResponse {
  static: FundStatic
  metrics: FundMetrics | null
}

// ============================================
// Search & Compare
// ============================================
export interface FundSearchResult {
  scheme_id: string
  amfi_code: number
  name: string
  amc_name: string
  sebi_category: string
  plan: "Direct" | "Regular"
  option_type: "Growth" | "IDCW"
  nav: number | null
  nav_date: string | null
}

export interface CompareRequest {
  ids: string[]  // scheme_ids, max 5
}

export interface CompareResponse {
  funds: FundDetailResponse[]
}

// ============================================
// Categories for filters
// ============================================
export interface CategoryInfo {
  sebi_category: string
  fund_count: number
}
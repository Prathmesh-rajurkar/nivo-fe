/**
 * MSW (Mock Service Worker) handlers for Nivo API.
 * Simulates the FastAPI backend endpoints.
 */

import { http, HttpResponse } from "msw"
import {
  searchFunds,
  getFundById,
  compareFunds,
  MOCK_CATEGORIES,
} from "../mock-data"
import type { FundSearchResult, FundDetailResponse, CompareResponse, CategoryInfo } from "../api-types"

// Simulate network delay
const DELAY_MS = 150

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const handlers = [
  // GET /api/v1/funds/search?q=...
  http.get("/api/v1/funds/search", async ({ request }) => {
    await delay(DELAY_MS)
    const url = new URL(request.url)
    const q = url.searchParams.get("q") ?? ""
    const limit = parseInt(url.searchParams.get("limit") ?? "10", 10)
    const results = searchFunds(q, limit)
    return HttpResponse.json<FundSearchResult[]>(results)
  }),

  // GET /api/v1/funds/:schemeId
  http.get("/api/v1/funds/:schemeId", async ({ params }) => {
    await delay(DELAY_MS)
    const { schemeId } = params
    const fund = getFundById(schemeId as string)
    if (!fund) {
      return HttpResponse.json({ error: "Fund not found" }, { status: 404 })
    }
    return HttpResponse.json<FundDetailResponse>(fund)
  }),

  // GET /api/v1/funds/compare?ids=...
  http.get("/api/v1/funds/compare", async ({ request }) => {
    await delay(DELAY_MS)
    const url = new URL(request.url)
    const idsParam = url.searchParams.get("ids")
    if (!idsParam) {
      return HttpResponse.json({ error: "ids parameter required" }, { status: 400 })
    }
    const ids = idsParam.split(",").slice(0, 5) // Max 5 funds
    const result = compareFunds(ids)
    return HttpResponse.json<CompareResponse>(result)
  }),

  // GET /api/v1/categories
  http.get("/api/v1/categories", async () => {
    await delay(DELAY_MS)
    return HttpResponse.json<CategoryInfo[]>(MOCK_CATEGORIES)
  }),
]
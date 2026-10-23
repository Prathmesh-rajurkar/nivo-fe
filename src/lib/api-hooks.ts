/**
 * API hooks using TanStack Query.
 * These will work with both MSW (dev) and real FastAPI backend (prod).
 */

import { useQuery } from "@tanstack/react-query"
import type { FundSearchResult, FundDetailResponse, CompareResponse, CategoryInfo } from "./api-types"

const API_BASE = "/api/v1"

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }))
    throw new Error(error.error ?? `HTTP ${res.status}`)
  }
  return res.json()
}

export function useFundSearch(query: string, limit = 10) {
  return useQuery({
    queryKey: ["funds", "search", query, limit],
    queryFn: () => fetchJson<FundSearchResult[]>(`${API_BASE}/funds/search?q=${encodeURIComponent(query)}&limit=${limit}`),
    enabled: query.trim().length > 0,
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

export function useFundDetail(schemeId: string | null) {
  return useQuery({
    queryKey: ["funds", "detail", schemeId],
    queryFn: () => fetchJson<FundDetailResponse>(`${API_BASE}/funds/${schemeId}`),
    enabled: !!schemeId,
    gcTime: 1000 * 60 * 10,
  })
}

export function useCompareFunds(ids: string[]) {
  return useQuery({
    queryKey: ["funds", "compare", ids],
    queryFn: () => fetchJson<CompareResponse>(`${API_BASE}/funds/compare?ids=${ids.join(",")}`),
    enabled: ids.length > 0,
    gcTime: 1000 * 60 * 5,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchJson<CategoryInfo[]>(`${API_BASE}/categories`),
    gcTime: 1000 * 60 * 30, // 30 minutes
  })
}
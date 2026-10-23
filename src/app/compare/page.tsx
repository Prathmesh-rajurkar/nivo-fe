"use client"

import { useState } from "react"
import { FundMultiSearch } from "@/components/fund/search"
import { CompareTable } from "@/components/fund/compare-table"
import { useCompareFunds, useFundSearch } from "@/lib/api-hooks"
import type { FundSearchResult } from "@/lib/api-types"

export default function ComparePage() {
  const [selectedFunds, setSelectedFunds] = useState<FundSearchResult[]>([])

  const { data: searchResults } = useFundSearch("", 0)

  const { data: compareData, isLoading, error } = useCompareFunds(
    selectedFunds.map((f) => f.scheme_id)
  )

  const handleAdd = (fund: FundSearchResult) => {
    setSelectedFunds((prev) => [...prev, fund])
  }

  const handleRemove = (schemeId: string) => {
    setSelectedFunds((prev) => prev.filter((f) => f.scheme_id !== schemeId))
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Compare Funds</h1>
          <p className="text-muted-foreground mt-2">
            Add up to 5 funds to compare side by side across 35+ metrics.
          </p>
        </div>

        <FundMultiSearch
          selectedFunds={selectedFunds}
          onAdd={handleAdd}
          onRemove={handleRemove}
          maxSelection={5}
        />

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive">
            Error loading comparison: {error.message}
          </div>
        )}

        {selectedFunds.length > 0 && (
          <div className="mt-8">
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading comparison...</div>
            ) : compareData ? (
              <CompareTable funds={compareData.funds} />
            ) : (
              <div className="text-center py-12 text-destructive">No data available</div>
            )}
          </div>
        )}

        {selectedFunds.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground">
            <p className="text-lg">No funds selected</p>
            <p className="mt-2">Search and add funds above to start comparing</p>
          </div>
        )}
      </div>
    </div>
  )
}
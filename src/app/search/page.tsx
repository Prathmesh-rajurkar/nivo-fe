"use client"

import { useState } from "react"
import { FundSearch } from "@/components/fund/search"
import { FundDetail } from "@/components/fund/fund-detail"
import { useFundSearch, useFundDetail } from "@/lib/api-hooks"
import type { FundSearchResult } from "@/lib/api-types"

export default function SearchPage() {
  const [selectedFund, setSelectedFund] = useState<FundSearchResult | null>(null)

  const { data: searchResults } = useFundSearch("", 0)

  const handleSelect = (fund: FundSearchResult) => {
    setSelectedFund(fund)
  }

  const { data: fundDetail, isLoading } = useFundDetail(selectedFund?.scheme_id ?? null)

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Find a Fund</h1>
          <p className="text-muted-foreground mt-2">
            Search by name, AMC, or category. Select a fund to view full details.
          </p>
        </div>

        <FundSearch onSelect={handleSelect} />

        {selectedFund && (
          <div className="mt-8">
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading fund details...</div>
            ) : fundDetail ? (
              <FundDetail fund={fundDetail} />
            ) : (
              <div className="text-center py-12 text-destructive">Fund not found</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
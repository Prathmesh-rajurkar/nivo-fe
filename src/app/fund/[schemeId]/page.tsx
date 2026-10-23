"use client"

import { FundDetail } from "@/components/fund/fund-detail"
import { useFundDetail } from "@/lib/api-hooks"
import { useParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import type { FundDetailResponse } from "@/lib/api-types"

function FundPageContent() {
  const params = useParams()
  const schemeId = params.schemeId as string
  const [fund, setFund] = useState<FundDetailResponse | null>(null)
  const [notFound, setNotFound] = useState(false)

  const { data, isLoading, error } = useFundDetail(schemeId)

  useEffect(() => {
    if (data) setFund(data)
    if (error) setNotFound(true)
  }, [data, error])

  if (!schemeId) return <div>Loading...</div>
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading fund details...</div>
  if (notFound || !fund) return <div className="min-h-screen flex items-center justify-center text-destructive">Fund not found</div>

  return <FundDetail fund={fund} />
}

export default function FundPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading fund details...</div>}>
      <FundPageContent />
    </Suspense>
  )
}
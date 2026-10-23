"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { METRIC_DEFS, METRIC_GROUPS, type MetricDef, type MetricGroup } from "@/lib/metric-defs"
import type { FundDetailResponse } from "@/lib/api-types"
import { MetricRow } from "./metric-card"

interface CompareTableProps {
  funds: FundDetailResponse[]
  selectedGroups?: MetricGroup[]
  onGroupToggle?: (group: MetricGroup, open: boolean) => void
}

export function CompareTable({ funds, selectedGroups = ["returns", "risk"], onGroupToggle }: CompareTableProps) {
  if (funds.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">Select funds to compare</p>
        <p className="text-sm mt-1">Add up to 5 funds using the search above</p>
      </div>
    )
  }

  // Prepare data for each fund
  const fundData = funds.map((fund) => ({
    static: fund.static,
    metrics: fund.metrics,
    // Merge static fields into metrics for easy access
    ...fund.static,
    nav: fund.metrics?.nav ?? null,
  }))

  return (
    <div className="space-y-4">
      {/* Fund Header Row */}
      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48 min-w-[180px] sticky left-0 bg-card/95 backdrop-blur-sm z-10">Metric</TableHead>
              {fundData.map((fund, idx) => (
                <TableHead key={fund.static.scheme_id} className="w-40 min-w-[160px] text-center sticky left-0 bg-card/95 backdrop-blur-sm z-10">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-medium text-sm truncate max-w-[150px]">{fund.static.name}</span>
                    <span className="text-xs text-muted-foreground">{fund.static.sebi_category}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                      {fund.static.plan} - {fund.static.option_type}
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        </Table>
      </div>

      {/* Accordion Groups */}
      <div className="space-y-2">
        {METRIC_GROUPS.map((group) => {
          const metrics = METRIC_DEFS.filter((m) => m.group === group.key && m.showInCompare)
          const isOpen = selectedGroups.includes(group.key)

          return (
            <Accordion key={group.key} type="single" className="border rounded-lg overflow-hidden">
              <AccordionItem value={group.key}>
                <AccordionTrigger className="flex items-center gap-3 px-4 py-3 bg-muted/50 hover:bg-muted">
                  <span className="text-lg">{group.icon}</span>
                  <div className="flex-1">
                    <span className="font-medium">{group.label}</span>
                    <div className="text-xs text-muted-foreground">{group.description}</div>
                  </div>
                  <span className="text-sm text-muted-foreground">{metrics.length} metrics</span>
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableBody>
                        {metrics.map((def) => {
                          const values = fundData.map((fd) => {
                            // Try to get value from metrics first, then static
                            if (fd.metrics && def.key in fd.metrics) {
                              return (fd.metrics as any)[def.key]
                            }
                            if (def.key in fd) {
                              return (fd as any)[def.key]
                            }
                            return null
                          })

                          // Determine if we should highlight (best value in column)
                          let highlightIdx = -1
                          if (def.sortDirection !== undefined && values.some((v) => typeof v === "number")) {
                            const numericValues = values.map((v, i) => ({ v: v as number, i })).filter((x) => typeof x.v === "number")
                            if (numericValues.length > 0) {
                              const best = def.sortDirection === "desc"
                                ? numericValues.reduce((a, b) => (a.v > b.v ? a : b))
                                : numericValues.reduce((a, b) => (a.v < b.v ? a : b))
                              highlightIdx = best.i
                            }
                          }

                          return (
                            <TableRow key={def.key}>
                              <TableCell className="w-48 min-w-[180px] sticky left-0 bg-card/95 backdrop-blur-sm z-10 font-medium text-sm">
                                {def.label}
                                {def.tooltip && (
                                  <span className="ml-1 cursor-help text-muted-foreground hover:text-foreground" title={def.tooltip}>
                                    ⓘ
                                  </span>
                                )}
                              </TableCell>
                              {values.map((value, idx) => (
                                <TableCell
                                  key={idx}
                                  className={cn(
                                    "text-center font-mono text-sm tabular-nums",
                                    idx === highlightIdx && "font-semibold text-primary"
                                  )}
                                >
                                  {typeof value === "number" ? def.format(value) : value ?? "—"}
                                </TableCell>
                              ))}
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}
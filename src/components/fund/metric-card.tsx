"use client"

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { MetricDef } from "@/lib/metric-defs"

interface MetricCardProps {
  def: MetricDef
  value: number | string | null | undefined
  className?: string
  compact?: boolean
}

export function MetricCard({ def, value, className, compact = false }: MetricCardProps) {
  const formatted = typeof value === "number" ? def.format(value) : value ?? "—"
  const isNegative = typeof value === "number" && value < 0
  const isPositive = typeof value === "number" && value > 0

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex flex-col gap-1 p-4 rounded-lg border bg-card transition-colors hover:border-primary/50",
              compact && "p-3",
              className
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className={cn("font-medium text-sm", compact && "text-xs")}>
                {def.shortLabel ?? def.label}
              </span>
              {def.tooltip && (
                <TooltipContent side="top" align="start" className="max-w-xs text-xs">
                  {def.tooltip}
                </TooltipContent>
              )}
            </div>
            <div className={cn("font-mono text-2xl font-semibold", compact && "text-xl")}>
              {formatted}
            </div>
            <div className={cn("text-xs text-muted-foreground", compact && "hidden")}>
              {def.label}
            </div>
          </div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}

interface MetricRowProps {
  def: MetricDef
  value: number | string | null | undefined
  highlight?: boolean
}

export function MetricRow({ def, value, highlight = false }: MetricRowProps) {
  const formatted = typeof value === "number" ? def.format(value) : value ?? "—"
  const isNegative = typeof value === "number" && value < 0
  const isPositive = typeof value === "number" && value > 0

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <tr className={cn("border-b last:border-0 transition-colors hover:bg-muted/50", highlight && "bg-primary/5")}>
            <td className="px-4 py-3 font-medium text-sm">
              {def.label}
              {def.tooltip && (
                <TooltipContent side="right" align="start" className="max-w-xs text-xs">
                  {def.tooltip}
                </TooltipContent>
              )}
            </td>
            <td className="px-4 py-3 font-mono text-sm font-medium tabular-nums">
              {formatted}
            </td>
          </tr>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
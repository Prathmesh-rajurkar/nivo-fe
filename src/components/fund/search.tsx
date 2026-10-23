"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Search, X, Loader2, Building2, Tag, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFundSearch } from "@/lib/api-hooks"
import type { FundSearchResult } from "@/lib/api-types"

interface SearchProps {
  onSelect: (fund: FundSearchResult) => void
  placeholder?: string
  disabled?: boolean
  showAddButton?: boolean
  selectedCount?: number
  maxSelection?: number
}

export function FundSearch({
  onSelect,
  placeholder = "Search funds by name, AMC, or category...",
  disabled = false,
  showAddButton = false,
  selectedCount = 0,
  maxSelection = 5,
}: SearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: results = [], isLoading, error } = useFundSearch(query, 10)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen || results.length === 0) return

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1))
          break
        case "ArrowUp":
          event.preventDefault()
          setHighlightedIndex((prev) => Math.max(prev - 1, -1))
          break
        case "Enter":
          event.preventDefault()
          if (highlightedIndex >= 0) {
            onSelect(results[highlightedIndex])
            setQuery("")
            setIsOpen(false)
            setHighlightedIndex(-1)
            inputRef.current?.blur()
          }
          break
        case "Escape":
          setIsOpen(false)
          setHighlightedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, highlightedIndex, onSelect])

  const handleSelect = (fund: FundSearchResult) => {
    onSelect(fund)
    setQuery("")
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length > 0)
    setHighlightedIndex(-1)
  }

  const handleClear = () => {
    setQuery("")
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }

  const isAtLimit = selectedCount >= maxSelection

  return (
    <div className="relative w-full max-w-xl" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(query.length > 0)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          disabled={disabled || isAtLimit}
          className={cn(
            "pl-10 pr-10",
            isAtLimit && "bg-muted/50"
          )}
          aria-autocomplete="list"
          aria-controls="fund-search-results"
          aria-expanded={isOpen}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {isLoading && (
          <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isAtLimit && (
        <p className="mt-1 text-xs text-muted-foreground">
          Maximum {maxSelection} funds selected for comparison
        </p>
      )}

      {isOpen && (results.length > 0 || error) && (
        <DropdownMenu>
          <DropdownMenuContent
            id="fund-search-results"
            className="w-full max-h-96 p-0"
            sideOffset={4}
            align="start"
          >
            {error && (
              <DropdownMenuItem className="text-destructive px-4 py-3 text-sm">
                Error loading results
              </DropdownMenuItem>
            )}
            {results.length === 0 && !isLoading && !error && (
              <DropdownMenuItem className="text-muted-foreground px-4 py-3 text-sm">
                No funds found matching "{query}"
              </DropdownMenuItem>
            )}
            {results.map((fund, index) => (
              <DropdownMenuItem
                key={fund.scheme_id}
                className={cn(
                  "flex flex-col items-start gap-1 px-4 py-3 text-left",
                  index === highlightedIndex && "bg-accent"
                )}
                onClick={() => handleSelect(fund)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium truncate">{fund.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-muted">
                    {fund.plan} - {fund.option_type}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground w-full">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {fund.amc_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {fund.sebi_category}
                  </span>
                  {fund.nav && (
                    <span className="flex items-center gap-1 font-mono">
                      <Info className="h-3 w-3" />
                      NAV: ₹{fund.nav.toFixed(2)}
                    </span>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
            {showAddButton && selectedCount > 0 && selectedCount < maxSelection && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-primary font-medium"
                  onClick={() => {
                    // This would trigger adding to compare - handled by parent
                  }}
                >
                  Add {selectedCount} fund{selectedCount > 1 ? "s" : ""} to compare
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

// Search input for the compare page - allows multiple selections
interface MultiSearchProps {
  selectedFunds: FundSearchResult[]
  onAdd: (fund: FundSearchResult) => void
  onRemove: (schemeId: string) => void
  maxSelection?: number
}

export function FundMultiSearch({ selectedFunds, onAdd, onRemove, maxSelection = 5 }: MultiSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: results = [], isLoading } = useFundSearch(query, 10)

  const filteredResults = results.filter((r) => !selectedFunds.some((s) => s.scheme_id === r.scheme_id))

  return (
    <div className="w-full max-w-2xl">
      {/* Selected chips */}
      {selectedFunds.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedFunds.map((fund) => (
            <span
              key={fund.scheme_id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              <span className="truncate max-w-[150px]">{fund.name}</span>
              <button
                type="button"
                onClick={() => onRemove(fund.scheme_id)}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label={`Remove ${fund.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={selectedFunds.length === 0 ? "Search and add funds to compare..." : "Add another fund..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          disabled={selectedFunds.length >= maxSelection}
          className="pl-10"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && filteredResults.length > 0 && (
        <DropdownMenu>
          <DropdownMenuContent className="w-full max-h-64 p-0" sideOffset={4} align="start">
            {filteredResults.map((fund, index) => (
              <DropdownMenuItem
                key={fund.scheme_id}
                className="flex flex-col items-start gap-1 px-4 py-3 text-left"
                onClick={() => {
                  onAdd(fund)
                  setQuery("")
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium truncate">{fund.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-muted">
                    {fund.plan} - {fund.option_type}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground w-full">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {fund.amc_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {fund.sebi_category}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
            {filteredResults.length === 0 && query && (
              <DropdownMenuItem className="text-muted-foreground px-4 py-3 text-sm">
                No matching funds found
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {selectedFunds.length >= maxSelection && (
        <p className="mt-1 text-xs text-muted-foreground">
          Maximum {maxSelection} funds can be compared at once
        </p>
      )}
    </div>
  )
}
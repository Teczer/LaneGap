'use client'

import { useRef, useState } from 'react'
import { LuSearch, LuX } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface IChampionSearchProps {
  onQueryChange: (query: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export const ChampionSearch = ({
  onQueryChange,
  placeholder = 'Search champion...',
  className,
  autoFocus = false,
}: IChampionSearchProps) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (value: string) => {
    setQuery(value)
    onQueryChange(value)
  }

  const handleClear = () => {
    setQuery('')
    onQueryChange('')
    inputRef.current?.focus()
  }

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        ref={inputRef}
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        icon={<LuSearch className="h-4 w-4" />}
        className="pr-10"
      />

      {query && (
        <button
          onClick={handleClear}
          className="text-foreground-muted hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
        >
          <LuX className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

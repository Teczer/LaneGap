'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LuSearch, LuX } from 'react-icons/lu'
import type { IChampion, TLanguage } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useChampions } from '@/hooks/queries'
import { Input } from '@/components/ui/input'
import { useSettingsStore } from '@/app/store/settings.store'
import { ChampionIcon } from './champion-icon.component'

interface IChampionSearchProps {
  onSelect: (champion: IChampion) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export function ChampionSearch({
  onSelect,
  placeholder = 'Search champion...',
  className,
  autoFocus = false,
}: IChampionSearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const { data: champions = [] } = useChampions()
  const language = useSettingsStore((s) => s.language)

  const filteredChampions = useMemo(() => {
    if (!query.trim()) return champions
    const lowerQuery = query.toLowerCase()
    return champions.filter(
      (c) =>
        c.name.en.toLowerCase().includes(lowerQuery) ||
        c.name.fr.toLowerCase().includes(lowerQuery) ||
        c.id.toLowerCase().includes(lowerQuery)
    )
  }, [champions, query])

  const handleSelect = useCallback(
    (champion: IChampion) => {
      onSelect(champion)
      setQuery('')
      setIsOpen(false)
      setSelectedIndex(0)
    },
    [onSelect]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen && e.key !== 'ArrowDown') return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setIsOpen(true)
          setSelectedIndex((prev) => Math.min(prev + 1, filteredChampions.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          const selected = filteredChampions[selectedIndex]
          if (selected) handleSelect(selected)
          break
        case 'Escape':
          setIsOpen(false)
          setQuery('')
          break
      }
    },
    [isOpen, filteredChampions, selectedIndex, handleSelect]
  )

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && isOpen) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, isOpen])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
          setSelectedIndex(0)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        icon={<LuSearch className="h-4 w-4" />}
        className="pr-10"
      />

      {query && (
        <button
          onClick={() => {
            setQuery('')
            inputRef.current?.focus()
          }}
          className="text-text-muted hover:text-text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
        >
          <LuX className="h-4 w-4" />
        </button>
      )}

      {isOpen && filteredChampions.length > 0 && (
        <ul
          ref={listRef}
          className="border-border bg-surface animate-fade-in absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border shadow-lg"
        >
          {filteredChampions.map((champion, index) => (
            <li key={champion.id}>
              <button
                onClick={() => handleSelect(champion)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left transition-colors',
                  index === selectedIndex && 'bg-surface-hover',
                  'hover:bg-surface-hover'
                )}
              >
                <ChampionIcon championId={champion.id} size="sm" showBorder={false} />
                <span className="text-text-primary text-sm">
                  {champion.name[language as TLanguage] || champion.name.en}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query && filteredChampions.length === 0 && (
        <div className="border-border bg-surface text-text-muted absolute z-50 mt-2 w-full rounded-xl border p-4 text-center text-sm shadow-lg">
          No champions found
        </div>
      )}
    </div>
  )
}

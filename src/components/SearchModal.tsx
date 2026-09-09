import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { matchesQuery } from '../lib/format'
import type { Article, Category } from '../types'

interface Props {
  open: boolean
  onClose: () => void
  articles: Article[]
  categories: Category[]
}

export function SearchModal({ open, onClose, articles, categories }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const catMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories],
  )

  const results = useMemo(() => {
    if (!query.trim()) return articles.slice(0, 8)
    return articles.filter((a) => matchesQuery(a, query)).slice(0, 12)
  }, [articles, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="아티클 검색"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-float)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-ink-muted">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="제목, 요약, 토픽으로 검색…"
            className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-ink-muted"
          />
          <span className="kbd">Esc</span>
        </div>

        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-ink-muted">검색 결과가 없습니다</li>
          ) : (
            results.map((a) => {
              const cat = catMap[a.category]
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    className="flex w-full flex-col gap-1 rounded-xl px-3 py-3 text-left hover:bg-surface-muted"
                    onClick={() => {
                      onClose()
                      navigate(`/article/${a.id}`)
                    }}
                  >
                    <span className="text-sm font-medium text-ink">{a.subject}</span>
                    <span className="text-xs text-ink-muted">
                      {cat?.nameKo ?? a.category} · {a.mins}분
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}

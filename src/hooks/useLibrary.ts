import { useEffect, useState } from 'react'
import { getArticles, getCategories, getMeta } from '../lib/data'
import type { Article, Category, Meta } from '../types'

interface LibraryState {
  articles: Article[]
  categories: Category[]
  meta: Meta | null
  loading: boolean
  error: string | null
}

export function useLibrary(): LibraryState {
  const [state, setState] = useState<LibraryState>({
    articles: [],
    categories: [],
    meta: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [articles, categories, meta] = await Promise.all([
          getArticles(),
          getCategories(),
          getMeta(),
        ])
        if (!cancelled) {
          setState({ articles, categories, meta, loading: false, error: null })
        }
      } catch (e) {
        if (!cancelled) {
          setState((s) => ({
            ...s,
            loading: false,
            error: e instanceof Error ? e.message : '데이터 로드 실패',
          }))
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

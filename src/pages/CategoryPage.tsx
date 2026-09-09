import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { Filters } from '../components/Filters'
import { useLibrary } from '../hooks/useLibrary'
import { matchesQuery, sortArticles } from '../lib/format'
import type { SortKey } from '../types'

export function CategoryPage() {
  const { id } = useParams<{ id: string }>()
  const { articles, categories, loading, error } = useLibrary()
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('all')
  const [hasEpisode, setHasEpisode] = useState(false)
  const [sort, setSort] = useState<SortKey>('newest')

  const category = categories.find((c) => c.id === id)

  const filtered = useMemo(() => {
    let list = articles.filter((a) => a.category === id)
    list = list.filter((a) => {
      if (difficulty !== 'all' && a.difficulty !== difficulty) return false
      if (hasEpisode && !a.ep) return false
      if (!matchesQuery(a, query)) return false
      return true
    })
    return sortArticles(list, sort)
  }, [articles, id, difficulty, hasEpisode, query, sort])

  if (loading) {
    return <div className="container-page py-24 text-center text-ink-muted">불러오는 중…</div>
  }

  if (error) {
    return <div className="container-page py-24 text-center text-rose-500">오류: {error}</div>
  }

  if (!category) {
    return (
      <div className="container-page space-y-4 py-16 text-center">
        <p className="text-ink-secondary">카테고리를 찾을 수 없습니다.</p>
        <Link to="/" className="btn-primary">
          홈으로
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page space-y-8">
      <div>
        <Link to="/" className="text-sm text-ink-muted hover:text-accent">
          ← 홈
        </Link>
        <div className="mt-4 flex items-start gap-4">
          <div
            className="mt-1 h-10 w-1.5 shrink-0 rounded-full"
            style={{ background: category.color }}
          />
          <div>
            <p className="section-label">{category.name}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">
              {category.nameKo}
            </h1>
            <p className="mt-2 max-w-2xl text-ink-secondary">{category.description}</p>
            <p className="mt-3 text-sm text-ink-muted">
              {category.articleCount}개 아티클 · 필터 결과 {filtered.length}개
            </p>
          </div>
        </div>
      </div>

      <Filters
        categories={categories}
        category={category.id}
        difficulty={difficulty}
        hasEpisode={hasEpisode}
        sort={sort}
        query={query}
        onCategory={() => undefined}
        onDifficulty={setDifficulty}
        onHasEpisode={setHasEpisode}
        onSort={setSort}
        onQuery={setQuery}
        onReset={() => {
          setQuery('')
          setDifficulty('all')
          setHasEpisode(false)
          setSort('newest')
        }}
        hideCategory
      />

      {filtered.length === 0 ? (
        <div className="card py-16 text-center text-ink-muted">조건에 맞는 아티클이 없습니다.</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((a) => (
            <ArticleCard key={a.id} article={a} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}

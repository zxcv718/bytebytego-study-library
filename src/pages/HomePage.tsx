import { useMemo, useState } from 'react'
import { ArticleCard } from '../components/ArticleCard'
import { CategoryCard } from '../components/CategoryCard'
import { Filters } from '../components/Filters'
import { useLibrary } from '../hooks/useLibrary'
import { matchesQuery, sortArticles } from '../lib/format'
import type { SortKey } from '../types'

export function HomePage() {
  const { articles, categories, meta, loading, error } = useLibrary()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [hasEpisode, setHasEpisode] = useState(false)
  const [sort, setSort] = useState<SortKey>('newest')

  const catMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories],
  )

  const filtered = useMemo(() => {
    let list = articles.filter((a) => {
      if (category !== 'all' && a.category !== category) return false
      if (difficulty !== 'all' && a.difficulty !== difficulty) return false
      if (hasEpisode && !a.ep) return false
      if (!matchesQuery(a, query)) return false
      return true
    })
    return sortArticles(list, sort)
  }, [articles, category, difficulty, hasEpisode, query, sort])

  const episodeCount = useMemo(() => articles.filter((a) => a.ep).length, [articles])
  const totalMins = useMemo(
    () => articles.reduce((sum, a) => sum + (a.mins || 0), 0),
    [articles],
  )

  if (loading) {
    return (
      <div className="container-page py-24 text-center text-ink-muted">라이브러리 불러오는 중…</div>
    )
  }

  if (error) {
    return (
      <div className="container-page py-24 text-center text-rose-500">오류: {error}</div>
    )
  }

  return (
    <div className="container-page space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated px-6 py-12 sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: 'var(--color-accent)' }}
        />
        <p className="section-label">Portfolio Study Library</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          ByteByteGo를
          <span className="text-accent"> 한국어로 </span>
          차근차근 읽기
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-ink-secondary">
          시스템 디자인·분산 시스템·AI 인프라 아티클의 한국어 요약과 핵심 테이크어웨이를
          모았습니다. 원문은 외부 링크로 바로 이어집니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#articles" className="btn-primary">
            아티클 둘러보기
          </a>
          <a href="#categories" className="btn-ghost">
            카테고리 보기
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: '아티클', value: meta?.totalArticles ?? articles.length },
          { label: '카테고리', value: categories.length },
          { label: '에피소드', value: episodeCount },
          { label: '총 읽기 분', value: totalMins },
        ].map((s) => (
          <div key={s.label} className="card px-4 py-5 text-center">
            <p className="text-2xl font-semibold tabular-nums tracking-tight text-ink">
              {s.value.toLocaleString('ko-KR')}
            </p>
            <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section id="categories" className="scroll-mt-20 space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Categories</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">카테고리</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="scroll-mt-20 space-y-4">
        <div>
          <p className="section-label">Articles</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">아티클 라이브러리</h2>
        </div>

        <Filters
          categories={categories}
          category={category}
          difficulty={difficulty}
          hasEpisode={hasEpisode}
          sort={sort}
          query={query}
          onCategory={setCategory}
          onDifficulty={setDifficulty}
          onHasEpisode={setHasEpisode}
          onSort={setSort}
          onQuery={setQuery}
          onReset={() => {
            setQuery('')
            setCategory('all')
            setDifficulty('all')
            setHasEpisode(false)
            setSort('newest')
          }}
        />

        <p className="text-sm text-ink-muted">
          {filtered.length.toLocaleString('ko-KR')}개 결과
        </p>

        {filtered.length === 0 ? (
          <div className="card py-16 text-center text-ink-muted">조건에 맞는 아티클이 없습니다.</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((a) => (
              <ArticleCard key={a.id} article={a} category={catMap[a.category]} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

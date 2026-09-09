import type { Category, Difficulty, SortKey } from '../types'
import { DIFFICULTY_LABEL } from '../lib/format'

interface Props {
  categories: Category[]
  category: string
  difficulty: string
  hasEpisode: boolean
  sort: SortKey
  query: string
  onCategory: (v: string) => void
  onDifficulty: (v: string) => void
  onHasEpisode: (v: boolean) => void
  onSort: (v: SortKey) => void
  onQuery: (v: string) => void
  onReset: () => void
  hideCategory?: boolean
}

const DIFFS: Difficulty[] = ['beginner', 'intermediate', 'advanced']

export function Filters({
  categories,
  category,
  difficulty,
  hasEpisode,
  sort,
  query,
  onCategory,
  onDifficulty,
  onHasEpisode,
  onSort,
  onQuery,
  onReset,
  hideCategory,
}: Props) {
  const active =
    (!hideCategory && category !== 'all') ||
    difficulty !== 'all' ||
    hasEpisode ||
    query.trim() !== '' ||
    sort !== 'newest'

  return (
    <div className="card space-y-3 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
          <input
            className="input !pl-10"
            placeholder="제목·요약·토픽 검색…"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
        </div>

        {!hideCategory && (
          <select
            className="select lg:w-52"
            value={category}
            onChange={(e) => onCategory(e.target.value)}
            aria-label="카테고리"
          >
            <option value="all">모든 카테고리</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameKo} ({c.articleCount})
              </option>
            ))}
          </select>
        )}

        <select
          className="select lg:w-36"
          value={difficulty}
          onChange={(e) => onDifficulty(e.target.value)}
          aria-label="난이도"
        >
          <option value="all">모든 난이도</option>
          {DIFFS.map((d) => (
            <option key={d} value={d}>
              {DIFFICULTY_LABEL[d]}
            </option>
          ))}
        </select>

        <select
          className="select lg:w-40"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          aria-label="정렬"
        >
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="mins-asc">짧은 읽기</option>
          <option value="mins-desc">긴 읽기</option>
          <option value="title">제목순</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-secondary">
          <input
            type="checkbox"
            checked={hasEpisode}
            onChange={(e) => onHasEpisode(e.target.checked)}
            className="size-4 rounded border-border accent-[var(--color-accent)]"
          />
          에피소드 있는 글만
        </label>
        {active && (
          <button type="button" onClick={onReset} className="text-sm text-accent hover:underline">
            필터 초기화
          </button>
        )}
      </div>
    </div>
  )
}

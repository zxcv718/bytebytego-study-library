import type { Difficulty, SortKey } from '../types'
import type { Article } from '../types'

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: '입문',
  intermediate: '중급',
  advanced: '고급',
}

export const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  beginner: 'badge-beginner',
  intermediate: 'badge-intermediate',
  advanced: 'badge-advanced',
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00`)
  if (Number.isNaN(d.getTime())) return dateStr
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export function formatMins(mins: number): string {
  return `${mins}분`
}

export function sortArticles(articles: Article[], sort: SortKey): Article[] {
  const list = [...articles]
  switch (sort) {
    case 'newest':
      return list.sort((a, b) => b.date.localeCompare(a.date))
    case 'oldest':
      return list.sort((a, b) => a.date.localeCompare(b.date))
    case 'mins-asc':
      return list.sort((a, b) => a.mins - b.mins)
    case 'mins-desc':
      return list.sort((a, b) => b.mins - a.mins)
    case 'title':
      return list.sort((a, b) => a.subject.localeCompare(b.subject))
    default:
      return list
  }
}

export function matchesQuery(article: Article, q: string): boolean {
  if (!q.trim()) return true
  const needle = q.toLowerCase().trim()
  const hay = [
    article.subject,
    article.summaryKo,
    article.category,
    ...article.topics,
    ...article.takeaways,
  ]
    .join(' ')
    .toLowerCase()
  return hay.includes(needle)
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Article {
  id: string
  subject: string
  date: string
  category: string
  summaryKo: string
  takeaways: string[]
  difficulty: Difficulty
  topics: string[]
  mins: number
  url: string
  ep: string | null
}

export interface Category {
  id: string
  name: string
  nameKo: string
  description: string
  color: string
  articleCount: number
}

export interface Meta {
  totalArticles: number
  dateRange: { start: string; end: string }
  generatedAt: string
  categoryBreakdown: Record<string, number>
  sources: string[]
}

export type SortKey = 'newest' | 'oldest' | 'mins-asc' | 'mins-desc' | 'title'

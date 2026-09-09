import type { Article, Category, Meta } from '../types'

let articlesCache: Article[] | null = null
let categoriesCache: Category[] | null = null
let metaCache: Meta | null = null

const ARTICLE_SHARDS = [
  'articles-00.json',
  'articles-01.json',
  'articles-02.json',
  'articles-03.json',
  'articles-04.json',
  'articles-05.json',
  'articles-06.json',
  'articles-07.json',
  'articles-08.json',
  'articles-09.json',
  'articles-10.json',
  'articles-11.json',
  'articles-12.json',
  'articles-13.json',
  'articles-14.json',
  'articles-15.json',
  'articles-16.json',
  'articles-17.json',
  'articles-18.json',
  'articles-19.json',
  'articles-20.json',
  'articles-21.json',
  'articles-22.json',
  'articles-23.json',
  'articles-24.json',
  'articles-25.json',
  'articles-26.json',
  'articles-27.json',
  'articles-28.json',
  'articles-29.json',
  'articles-30.json',
  'articles-31.json',
  'articles-32.json',
  'articles-33.json',
  'articles-34.json',
  'articles-35.json',
  'articles-36.json',
  'articles-37.json',
  'articles-38.json',
  'articles-39.json',
  'articles-40.json',
  'articles-41.json',
  'articles-42.json',
  'articles-43.json',
  'articles-44.json',
  'articles-45.json',
  'articles-46.json',
  'articles-47.json',
  'articles-48.json',
  'articles-49.json',
  'articles-50.json',
  'articles-51.json',
  'articles-52.json',
  'articles-53.json',
  'articles-54.json',
  'articles-55.json',
  'articles-56.json',
  'articles-57.json',
  'articles-58.json',
  'articles-59.json',
  'articles-60.json',
  'articles-61.json',
  'articles-62.json',
  'articles-63.json',
  'articles-64.json',
  'articles-65.json',
  'articles-66.json',
  'articles-67.json',
  'articles-68.json',
  'articles-69.json',
  'articles-70.json',
]

async function loadJson<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`)
  return res.json() as Promise<T>
}

async function loadArticlesFromShards(): Promise<Article[]> {
  const parts = await Promise.all(
    ARTICLE_SHARDS.map((name) => loadJson<Article[]>(`/data/shards/${name}`)),
  )
  return parts.flat()
}

export async function getArticles(): Promise<Article[]> {
  if (!articlesCache) {
    try {
      articlesCache = await loadJson<Article[]>('/data/articles.json')
    } catch {
      articlesCache = await loadArticlesFromShards()
    }
  }
  return articlesCache
}

export async function getCategories(): Promise<Category[]> {
  if (!categoriesCache) {
    categoriesCache = await loadJson<Category[]>('/data/categories.json')
  }
  return categoriesCache
}

export async function getMeta(): Promise<Meta> {
  if (!metaCache) {
    metaCache = await loadJson<Meta>('/data/meta.json')
  }
  return metaCache
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const articles = await getArticles()
  return articles.find((a) => a.id === id)
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const categories = await getCategories()
  return categories.find((c) => c.id === id)
}

export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  const articles = await getArticles()
  return articles.filter((a) => a.category === categoryId)
}

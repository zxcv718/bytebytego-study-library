import type { Article, Category, Meta } from '../types'

let articlesCache: Article[] | null = null
let categoriesCache: Category[] | null = null
let metaCache: Meta | null = null

async function loadJson<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`)
  return res.json() as Promise<T>
}

export async function getArticles(): Promise<Article[]> {
  if (!articlesCache) {
    articlesCache = await loadJson<Article[]>('/data/articles.json')
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

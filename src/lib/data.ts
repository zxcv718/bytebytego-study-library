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

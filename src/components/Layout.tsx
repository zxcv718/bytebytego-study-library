import { useEffect, useState, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { useTheme } from '../hooks/useTheme'
import { Header } from './Header'
import { SearchModal } from './SearchModal'

export function Layout({ children }: { children?: ReactNode }) {
  const { theme, toggle } = useTheme()
  const { articles, categories } = useLibrary()
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        theme={theme}
        onToggleTheme={toggle}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <main className="flex-1 pb-16 pt-8">{children ?? <Outlet />}</main>
      <footer className="border-t border-border py-8">
        <div className="container-page flex flex-col gap-2 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>ByteByteGo Study Library — 학습용 요약·핵심 정리</p>
          <p>
            원문은{' '}
            <a
              href="https://blog.bytebytego.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              ByteByteGo
            </a>
            에서 확인하세요
          </p>
        </div>
      </footer>
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={articles}
        categories={categories}
      />
    </div>
  )
}

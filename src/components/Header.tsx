import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

interface Props {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onOpenSearch: () => void
}

export function Header({ theme, onToggleTheme, onOpenSearch }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/80 backdrop-blur-xl">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            B
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-ink">ByteByteGo</p>
            <p className="text-[11px] text-ink-muted">Study Library</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm ${isActive ? 'bg-accent-soft text-accent-fg font-medium' : 'text-ink-secondary hover:text-ink'}`
            }
          >
            홈
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="btn-ghost !gap-2 !px-3 text-ink-muted"
            aria-label="검색 열기"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <span className="hidden text-sm sm:inline">검색</span>
            <span className="kbd hidden sm:inline-flex">⌘K</span>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}

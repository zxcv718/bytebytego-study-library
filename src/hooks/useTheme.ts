import { useCallback, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function getInitial(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('bbg-theme') as Theme | null
  if (stored === 'dark' || stored === 'light') return stored
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('bbg-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle, setTheme }
}

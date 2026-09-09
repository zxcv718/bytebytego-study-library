import { Link } from 'react-router-dom'
import type { Category } from '../types'

interface Props {
  category: Category
}

export function CategoryCard({ category }: Props) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="card-hover group relative overflow-hidden p-5"
    >
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: category.color }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
            {category.nameKo}
          </p>
          <p className="mt-1 text-xs text-ink-muted">{category.name}</p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums"
          style={{
            background: `${category.color}22`,
            color: category.color,
          }}
        >
          {category.articleCount}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-secondary">
        {category.description}
      </p>
    </Link>
  )
}

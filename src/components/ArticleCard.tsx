import { Link } from 'react-router-dom'
import { DIFFICULTY_CLASS, DIFFICULTY_LABEL, formatDate, formatMins } from '../lib/format'
import type { Article, Category } from '../types'

interface Props {
  article: Article
  category?: Category
}

export function ArticleCard({ article, category }: Props) {
  return (
    <Link to={`/article/${article.id}`} className="card-hover block p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
        {category && (
          <span
            className="rounded-md px-2 py-0.5 font-medium"
            style={{
              background: `${category.color}20`,
              color: category.color,
            }}
          >
            {category.nameKo}
          </span>
        )}
        <span className={DIFFICULTY_CLASS[article.difficulty]}>
          {DIFFICULTY_LABEL[article.difficulty]}
        </span>
        {article.ep && (
          <span className="chip !py-0.5 !text-[11px]">EP {article.ep}</span>
        )}
      </div>

      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-ink tracking-tight">
        {article.subject}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-secondary">
        {article.summaryKo}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
        <span>{formatDate(article.date)}</span>
        <span aria-hidden>·</span>
        <span>{formatMins(article.mins)}</span>
        {article.topics.slice(0, 2).map((t) => (
          <span key={t} className="chip !py-0.5">
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}

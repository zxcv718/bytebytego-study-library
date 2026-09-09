import { Link, useParams } from 'react-router-dom'
import { useLibrary } from '../hooks/useLibrary'
import { DIFFICULTY_CLASS, DIFFICULTY_LABEL, formatDate, formatMins } from '../lib/format'

export function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  const { articles, categories, loading, error } = useLibrary()

  const article = articles.find((a) => a.id === id)
  const category = article
    ? categories.find((c) => c.id === article.category)
    : undefined

  if (loading) {
    return <div className="container-page py-24 text-center text-ink-muted">불러오는 중…</div>
  }

  if (error) {
    return <div className="container-page py-24 text-center text-rose-500">오류: {error}</div>
  }

  if (!article) {
    return (
      <div className="container-page space-y-4 py-16 text-center">
        <p className="text-ink-secondary">아티클을 찾을 수 없습니다.</p>
        <Link to="/" className="btn-primary">
          홈으로
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page">
      <article className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-ink-muted hover:text-accent">
            홈
          </Link>
          <span className="text-ink-muted">/</span>
          {category && (
            <>
              <Link
                to={`/category/${category.id}`}
                className="text-ink-muted hover:text-accent"
              >
                {category.nameKo}
              </Link>
              <span className="text-ink-muted">/</span>
            </>
          )}
          <span className="text-ink-secondary">아티클</span>
        </div>

        <header className="space-y-4 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-2">
            {category && (
              <Link
                to={`/category/${category.id}`}
                className="rounded-md px-2.5 py-1 text-xs font-medium"
                style={{
                  background: `${category.color}22`,
                  color: category.color,
                }}
              >
                {category.nameKo}
              </Link>
            )}
            <span className={DIFFICULTY_CLASS[article.difficulty]}>
              {DIFFICULTY_LABEL[article.difficulty]}
            </span>
            {article.ep && <span className="chip">EP {article.ep}</span>}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-[2rem] sm:leading-snug">
            {article.subject}
          </h1>

          <div className="flex flex-wrap gap-3 text-sm text-ink-muted">
            <span>{formatDate(article.date)}</span>
            <span aria-hidden>·</span>
            <span>{formatMins(article.mins)} 읽기</span>
          </div>
        </header>

        <section className="mt-8 space-y-3">
          <h2 className="section-label">Summary</h2>
          <p className="prose-reading">{article.summaryKo}</p>
        </section>

        {article.takeaways.length > 0 && (
          <section className="mt-10 space-y-4">
            <h2 className="section-label">Takeaways</h2>
            <ol className="space-y-3">
              {article.takeaways.map((t, i) => (
                <li
                  key={`${i}-${t.slice(0, 24)}`}
                  className="card flex gap-3 p-4 text-[15px] leading-7 text-ink-secondary"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-fg">
                    {i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {article.topics.length > 0 && (
          <section className="mt-10 space-y-3">
            <h2 className="section-label">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {article.topics.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-2xl border border-accent/30 bg-accent-soft/50 p-6 sm:p-8">
          <p className="text-sm font-medium text-accent-fg">원문에서 더 깊이 읽기</p>
          <p className="mt-2 text-sm leading-6 text-ink-secondary">
            이 페이지는 학습용 요약과 핵심 포인트만 담고 있습니다. 다이어그램·전체 본문은
            ByteByteGo 원문에서 확인하세요.
          </p>
          {article.url ? (
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5 inline-flex"
            >
              원문 읽기
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          ) : (
            <p className="mt-5 text-sm text-ink-muted">원문 링크가 아직 없습니다.</p>
          )}
        </section>

        <div className="mt-10 flex gap-3">
          <Link to="/" className="btn-ghost">
            ← 라이브러리
          </Link>
          {category && (
            <Link to={`/category/${category.id}`} className="btn-ghost">
              {category.nameKo}
            </Link>
          )}
        </div>
      </article>
    </div>
  )
}

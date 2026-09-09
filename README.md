# ByteByteGo Study Library

ByteByteGo 시스템 디자인 아티클을 한국어 요약·핵심 테이크어웨이로 모아 둔 **학습용 포트폴리오 웹앱**입니다.  
원문 본문은 포함하지 않으며, 각 아티클의 **원문 읽기** 링크로 이동합니다.

A readability-first study library for ByteByteGo articles: Korean summaries and takeaways only — full bodies live on the original site.

## Features / 기능

- 홈: 히어로, 통계, 카테고리 카드, 검색·필터·정렬, 아티클 카드
- `/category/:id` 카테고리별 목록
- `/article/:id` 한국어 요약, takeaways, topics, 메타, CTA **원문 읽기**
- 다크 기본 + 라이트 토글, Pretendard 폰트, ⌘K / Ctrl+K 검색

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- React Router

## Data

`public/data/` 에 JSON 데이터셋이 포함되어 있습니다.

| 파일 | 설명 |
|------|------|
| `articles.json` | ~566 articles (요약·takeaways만) |
| `categories.json` | 12 categories |
| `meta.json` | 집계 메타 |

## Run locally / 로컬 실행

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## License note

ByteByteGo 콘텐츠의 저작권은 원 저작자에게 있습니다. 이 저장소는 개인 학습·포트폴리오 목적의 요약 인덱스이며, 원문 전체를 복제하지 않습니다.

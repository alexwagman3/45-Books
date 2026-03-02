# 45 Book Summaries

> **Wisdom translated into action.**

A personal bookshelf website featuring curated summaries and takeaways from 45 books, organized across five life pillars.

Live site: [45booksummaries.com](https://45booksummaries.com)

---

## The Bookshelf

45 books organized into **5 pillars**, each with **3 shelves** of **3 books**:

| Pillar | Shelves |
|---|---|
| **Money** | Build a Career · Run a Side-Hustle · Manage Your Finances |
| **Health** | Feed Your Body · Exercise Your Muscles · Manage Your Emotions |
| **Character** | Develop Resilience · Grow in Wisdom · Be Adventurous |
| **Relationships** | Love Your Family · Love Your Neighbors · Love Your Spouse |
| **Faith** | Worship · Serve · Disciple |

---

## Tech Stack

- **[Astro](https://astro.build)** — static site generation
- **MDX** — markdown content with embedded components
- **TypeScript** — strict type checking
- **Sentry** — error monitoring

---

## Content Structure

Each book has up to three layers of content:

1. **Summary & Motivation** — why to read and implement it
2. **Personal Takeaways** — extracted notes and action items (35 books)
3. **Excerpts** — raw quoted passages (6 books)

Three shelves (*Feed Your Body*, *Love Your Neighbors*, *Disciple*) consolidate all three books' takeaways into a single combined page.

---

## Project Structure

```
src/
├── content/
│   ├── books/        # 45 MDX files, one per book
│   ├── takeaways/    # Personal reading notes
│   └── excerpts/     # Raw quoted passages
├── pages/
│   ├── index.astro               # Homepage bookshelf
│   └── books/[slug]/             # Individual book pages
├── components/
│   ├── BookSpine.astro
│   ├── ShelfCase.astro
│   └── PillarSection.astro
├── layouts/
│   ├── BaseLayout.astro
│   └── BookLayout.astro
└── data/
    └── shelves.ts    # Pillar and shelf definitions
```

---

## Development

```bash
npm install
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site
npm run preview  # Preview built site
npm run check    # TypeScript/Astro type checking
```

### Environment Variables

```env
PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
```

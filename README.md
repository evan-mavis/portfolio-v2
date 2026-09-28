## my simple portfolio... but refined and converted to a next.js app :)

Live at [evan-mavis.dev](https://evan-mavis.dev).

The home page is a file tree of my life: it renders instantly (no load-in animation), and
expand/collapse state persists in `localStorage` (`portfolio-tree-state`), so the tree looks
exactly how you left it when you come back — even after visiting `/travel` or `/food`. The
`tech i use/` folder is a hierarchy of what I work with (frontend, backend, infra,
observability, tooling, productivity), including
[my agentic workflow skills](https://github.com/evan-mavis/skills).

Performance matters here: the home page is server-rendered, there is no client animation
library (framer-motion was removed), every tech icon is bundled locally at build time (no
runtime requests to api.iconify.design), and gallery photos are re-compressed in place with
EXIF/GPS metadata stripped. Lighthouse mobile performance is 90+ on `/`, `/travel`, and
`/food`.

### Quick start

Requires Node.js 24.

```bash
pnpm install && pnpm run dev
```

Open http://localhost:3000. No environment variables or external services are required.

### Scripts

- `pnpm run build`: production build (`pnpm run start` serves it)
- `pnpm run lint`, `pnpm run typecheck`, `pnpm run format:check`: static checks
- `pnpm test`, `pnpm run test:coverage`: unit tests (Vitest)
- `pnpm run test:e2e`: browser tests (Playwright; run `pnpm exec playwright install chromium` first)
- `pnpm run icons:generate`: regenerate `lib/icons-generated.ts` from the `@iconify-json/*` devDependencies (run after editing `ICON_SOURCES` in `scripts/generate-icons.mjs`)
- `pnpm run images:optimize`: re-encode oversized `public/` photos in place (max 2400px, mozjpeg q80, EXIF stripped)
- `pnpm run check`: everything CI runs

See [AGENTS.md](./AGENTS.md) for conventions and a manual QA walkthrough, [docs/architecture.md](./docs/architecture.md) for how the site fits together, and [docs/runbook.md](./docs/runbook.md) for incident and rollback steps.

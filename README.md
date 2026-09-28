## my simple portfolio... but refined and converted to a next.js app :)

Live at [evan-mavis.dev](https://evan-mavis.dev).

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

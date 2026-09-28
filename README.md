## my simple portfolio... but refined and converted to a next.js app :)

Live at [evan-mavis.dev](https://evan-mavis.dev).

### Quick start

Requires Node.js 24.

```bash
npm install && npm run dev
```

Open http://localhost:3000. No environment variables or external services are required.

### Scripts

- `npm run build`: production build (`npm run start` serves it)
- `npm run lint`, `npm run typecheck`, `npm run format:check`: static checks
- `npm test`, `npm run test:coverage`: unit tests (Vitest)
- `npm run test:e2e`: browser tests (Playwright; run `npx playwright install chromium` first)
- `npm run check`: everything CI runs

See [AGENTS.md](./AGENTS.md) for conventions and a manual QA walkthrough, [docs/architecture.md](./docs/architecture.md) for how the site fits together, and [docs/runbook.md](./docs/runbook.md) for incident and rollback steps.

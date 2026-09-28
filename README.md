# evan's portfolio

a folder tree with my work, photos, and a few things i like. built with next.js and hosted at [evan-mavis.dev](https://evan-mavis.dev).

## run it

use node.js 24 and pnpm.

```bash
pnpm install
pnpm run dev
```

open [localhost:3000](http://localhost:3000). no env vars or services needed.

## check it

- `pnpm run check` runs formatting, lint, types, and unit tests.
- `pnpm run test:e2e` runs browser tests. first run `pnpm exec playwright install chromium`.
- `pnpm run build` checks the production build.

[AGENTS.md](./AGENTS.md) has the repo rules. [the runbook](./docs/runbook.md) has deploy and rollback steps.

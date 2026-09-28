# agent notes

this is my portfolio. next.js 16, react 19, typescript, tailwind 4, and shadcn/ui. a push to `main` deploys on vercel.

## get started

use node.js 24 and pnpm. `pnpm-lock.yaml` is the lockfile.

```bash
pnpm install
pnpm run dev
```

open [localhost:3000](http://localhost:3000). no env vars, database, or auth needed.

## useful commands

| want to...            | run                                                                    |
| --------------------- | ---------------------------------------------------------------------- |
| check everything      | `pnpm run check`                                                       |
| build for production  | `pnpm run build`                                                       |
| run browser tests     | `pnpm exec playwright install chromium` once, then `pnpm run test:e2e` |
| regenerate tech icons | `pnpm run icons:generate`                                              |
| shrink large photos   | `pnpm run images:optimize`                                             |

`check` runs format, lint, types, unused code, duplicates, docs, and unit coverage. the pre-commit hook also checks staged files and types. don't skip it.

## where things live

- `app/` has `/`, `/travel`, `/food`, and `/api/health`.
- `components/` has the tree, avatar, and ui pieces.
- `lib/tree-state.ts` reads and writes the saved tree state. `TreeStateProvider` stays mounted in `app/layout.tsx` across pages.
- `public/` has photos, the resume, and the official factory logo. keep new images under 10 mb.
- `lib/icons-generated.ts` comes from `scripts/generate-icons.mjs`. edit the source list, then run `pnpm run icons:generate`. don't edit the generated file.
- unit tests sit next to code. browser tests live in `e2e/`.

## keep it tidy

- use camelCase for variables, PascalCase for types and components, and UPPER_CASE for module constants. eslint enforces this.
- put `"use client"` only where hooks or browser apis need it.
- new components need useful tests. keep coverage above the limits in `vitest.config.mts`.
- use `track("thing_click")` for user-facing links. never send personal data in event properties.
- comments should explain a surprising why. keep them short and lowercase unless a code name needs its exact spelling.

## quick browser check

open `/`, expand a few folders, then visit `/travel` and return. the tree should keep its state without replaying its open animation. open the avatar and close it outside the photo; the tree should stay put. check the food gallery, theme toggle, and favicon too.

## prs

use `.github/pull_request_template.md` when opening a pr. run `pnpm run check` and `pnpm run test:e2e` before shipping.

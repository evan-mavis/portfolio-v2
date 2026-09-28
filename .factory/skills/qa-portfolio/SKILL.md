---
name: qa-portfolio
description: Run and manually QA the portfolio site end to end (home tree, expand and theme toggles, travel and food galleries, health endpoint). Use after UI changes or before merging a PR that touches app/ or components/.
---

# QA the portfolio

The site has no auth, database, or required env vars, so it can always run locally.

1. Install and start: `pnpm install && pnpm run dev`. Wait for `Ready` on port 3000.
2. Health: `curl -s localhost:3000/api/health`. Expect `"status":"ok"` and an `X-Request-ID` header (`curl -si`).
3. Automated pass: `pnpm exec playwright install chromium` (once), then `pnpm run test:e2e`. It must pass.
4. Manual pass in a browser (agent-browser or Playwright):
   - `/`: the tree fades in, with `evan mavis/` and the job title expanded.
   - Click the expand toggle (top-right, first button). Every folder opens (`career/`, `my tech stack/`, `projects/`).
   - Click the theme toggle. The page switches between light and dark.
   - Click the avatar. It opens full-screen. Click it again to close.
   - Open `/travel` and `/food`. Images load and there are no broken tiles. **Back** returns to `/`.
   - Check the console for errors and hydration warnings.
5. Report each step as pass or fail with a screenshot of any failure, and include the output of `pnpm run check`.

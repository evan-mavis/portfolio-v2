# Runbook

## Where to look

- **Deploys and runtime logs**: Vercel dashboard → project `portfolio-v2` → Deployments / Logs.
- **Deploy impact and traffic**: Vercel → Analytics (page views, `*_click` events) and Speed Insights. Compare the hour before and after the deploy.
- **Health**: `curl -s https://evan-mavis.dev/api/health` returns `{"status":"ok","commit":"<sha>"}`. The commit tells you which deploy is live.
- **CI**: GitHub → Actions → `CI`.
- **Uptime alerts**: the `Uptime` workflow checks `/api/health` every 30 minutes. If a check fails, it opens (or comments on) a GitHub issue labeled `incident`, which notifies repository watchers.

## Site is down or broken after a deploy

1. Confirm the problem: open the site, then check `/api/health`.
2. **Roll back**: in Vercel → Deployments, choose the last good production deploy → **Instant Rollback**. Or from the CLI: `npx vercel rollback <deployment-url>`.
3. Revert the bad commit on `main` (`git revert <sha>`) so the next deploy doesn't bring the problem back.
4. Close the `incident` issue with a short note on the cause.

## Build fails on Vercel

- Run `npm run build` locally. Common causes: a type error, a lint error, or a Google Fonts outage (retry the build).
- Dependency problems: `rm -rf node_modules && npm ci`.

## Images or resume missing

- Files are served from `public/`. Check that the file is committed and the path in `app/*/page.tsx` matches exactly (paths are case-sensitive on Vercel).

## Security issue reported

- Check Dependabot and CodeQL alerts under GitHub → Security. Update the dependency, merge, and confirm the deploy.
- If a secret was committed: rotate it first, then remove it from history.

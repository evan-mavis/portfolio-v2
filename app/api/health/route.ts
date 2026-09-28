import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const requestId =
    request.headers.get("x-request-id") ??
    request.headers.get("x-vercel-id") ??
    crypto.randomUUID();
  const commit = process.env.VERCEL_GIT_COMMIT_SHA ?? "local";

  logger.debug("health check", { requestId, commit });

  return Response.json(
    { status: "ok", commit, requestId },
    { headers: { "Cache-Control": "no-store", "X-Request-ID": requestId } },
  );
}

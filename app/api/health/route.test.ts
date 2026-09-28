// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  afterEach(() => vi.restoreAllMocks());

  it("reports ok, is never cached, and echoes the caller's request id", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const response = GET(
      new Request("http://localhost/api/health", {
        headers: { "x-request-id": "req-123" },
      }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-request-id")).toBe("req-123");
    expect(await response.json()).toMatchObject({
      status: "ok",
      requestId: "req-123",
    });
  });

  it("generates a request id when none is supplied", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const response = GET(new Request("http://localhost/api/health"));
    expect(response.headers.get("x-request-id")).toMatch(/^[\w-]{8,}$/);
  });
});

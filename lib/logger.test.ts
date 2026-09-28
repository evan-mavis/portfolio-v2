import { afterEach, describe, expect, it, vi } from "vitest";
import { logger, redact } from "./logger";

describe("redact", () => {
  it("masks sensitive keys at any depth", () => {
    expect(
      redact({ user: { apiKey: "abc", name: "x" }, Authorization: "Bearer t" }),
    ).toEqual({
      user: { apiKey: "[REDACTED]", name: "x" },
      Authorization: "[REDACTED]",
    });
  });

  it("masks email addresses inside strings and arrays", () => {
    expect(redact(["contact me@example.com today"])).toEqual([
      "contact [REDACTED] today",
    ]);
  });

  it("leaves non-sensitive primitives untouched", () => {
    expect(redact({ count: 3, ok: true })).toEqual({ count: 3, ok: true });
  });
});

describe("logger", () => {
  afterEach(() => vi.restoreAllMocks());

  it("writes one JSON line per entry with redacted fields", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    logger.info("visit", { path: "/", token: "secret" });
    const entry = JSON.parse(log.mock.calls[0][0] as string);
    expect(entry).toMatchObject({
      level: "info",
      msg: "visit",
      path: "/",
      token: "[REDACTED]",
    });
    expect(entry.time).toEqual(expect.any(String));
  });

  it("routes errors and warnings to the matching console method", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    logger.error("boom");
    logger.warn("careful");
    expect(error).toHaveBeenCalledOnce();
    expect(warn).toHaveBeenCalledOnce();
  });
});

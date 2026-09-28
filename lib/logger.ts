type LogLevel = "debug" | "info" | "warn" | "error";
type LogFields = Record<string, unknown>;

const REDACTED = "[REDACTED]";
const SENSITIVE_KEY =
  /pass(word)?|secret|token|api[-_]?key|authorization|cookie|session|email/i;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

export function redact(value: unknown, depth = 0): unknown {
  if (depth > 5) return REDACTED;
  if (typeof value === "string") return value.replace(EMAIL, REDACTED);
  if (Array.isArray(value)) return value.map((item) => redact(item, depth + 1));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, inner]) => [
        key,
        SENSITIVE_KEY.test(key) ? REDACTED : redact(inner, depth + 1),
      ]),
    );
  }
  return value;
}

function write(level: LogLevel, message: string, fields: LogFields = {}) {
  const entry = JSON.stringify({
    level,
    time: new Date().toISOString(),
    msg: redact(message),
    ...(redact(fields) as LogFields),
  });
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

export const logger = {
  debug: (message: string, fields?: LogFields) =>
    write("debug", message, fields),
  info: (message: string, fields?: LogFields) => write("info", message, fields),
  warn: (message: string, fields?: LogFields) => write("warn", message, fields),
  error: (message: string, fields?: LogFields) =>
    write("error", message, fields),
};

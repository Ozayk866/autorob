/**
 * Backend xatosi. Backend javobi: { error: { code, message, details } }.
 * `details` — maydon xatolari: { [field]: message }, React Hook Form setError uchun.
 */
export class ApiError extends Error {
  /** @param {number} status @param {{ code?: string, message?: string, details?: Record<string, string> }} [error] */
  constructor(status, error) {
    super(error?.message || `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.code = error?.code;
    this.details = error?.details;
  }
}

/** Tarmoq xatosi (server javob bermadi) — status 0 */
export const isNetworkError = (e) => e instanceof ApiError && e.status === 0;

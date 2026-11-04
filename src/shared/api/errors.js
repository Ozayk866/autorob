/**
 * Backend xatosi. Javob: { error: { code, message, details? } }.
 * Validatsiya xatolarida `details` — `[{ path: "title.uz", message }]` (forma maydonlari uchun).
 * Boshqa xatolarda obyekt bo'lishi mumkin: 423 → `{ lockedUntil }`, 409 media → `{ usedIn }`.
 */
export class ApiError extends Error {
  /** @param {number} status @param {{ code?: string, message?: string, details?: unknown }} [error] */
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

/**
 * Maydon xatolari: [{ path, message }]. Validatsiya xatosi bo'lmasa — bo'sh massiv.
 * @returns {{ path: string, message: string }[]}
 */
export const fieldErrors = (e) => (e instanceof ApiError && Array.isArray(e.details) ? e.details : []);

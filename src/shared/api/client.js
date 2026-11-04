import { env } from "@/shared/config/env";
import { ApiError } from "./errors";

/**
 * fetch wrapper (docs: backend `docs/API_CONTRACT.md`).
 * - Javob `{ data }` → `data` qaytadi. Sahifalangan ro'yxat uchun `{ withMeta: true }` → `{ data, meta }`.
 * - JSON yoki FormData yuboradi. FormData'da Content-Type qo'yilmaydi — brauzer boundary bilan o'zi qo'yadi.
 * - `/api/admin/*` ga CSRF sarlavhasi `X-Requested-With: autorob-admin` qo'shiladi (public'ga qo'shilmaydi,
 *   aks holda har bir GET uchun ortiqcha preflight so'rov ketadi).
 * @param {string} path  masalan "/api/public/solutions?lang=ru"
 * @param {RequestInit & { body?: unknown, withMeta?: boolean }} [options]
 */
export async function api(path, { body, headers, withMeta = false, ...init } = {}) {
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  const hasJsonBody = body !== undefined && !isForm;
  const isAdmin = path.startsWith("/api/admin");

  let res;
  try {
    res = await fetch(`${env.VITE_API_URL}${path}`, {
      credentials: "include",
      ...init,
      headers: {
        ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
        ...(isAdmin ? { "X-Requested-With": "autorob-admin" } : {}),
        ...headers,
      },
      body: hasJsonBody ? JSON.stringify(body) : body,
    });
  } catch {
    throw new ApiError(0, { code: "NETWORK" });
  }

  const json = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    const error = new ApiError(res.status, json?.error);
    if (isAdmin && typeof window !== "undefined") notifyAuth(error);
    throw error;
  }
  return withMeta ? { data: json?.data, meta: json?.meta } : json?.data;
}

// Admin sessiyasi tugasa yoki parolni almashtirish talab qilinsa — features/auth shu hodisalarni tinglaydi
function notifyAuth(error) {
  if (error.status === 401) window.dispatchEvent(new Event("auth:unauthorized"));
  if (error.code === "PASSWORD_CHANGE_REQUIRED")
    window.dispatchEvent(new Event("auth:password-change-required"));
}

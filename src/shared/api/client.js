import { env } from "@/shared/config/env";
import { ApiError } from "./errors";

/**
 * fetch wrapper. JSON yoki FormData yuboradi, `{ data }` ichidagini qaytaradi.
 * FormData bo'lsa Content-Type qo'yilmaydi — brauzer boundary bilan o'zi qo'yadi.
 * @param {string} path  masalan "/api/public/solutions?lang=ru"
 * @param {RequestInit & { body?: unknown }} [options]
 */
export async function api(path, { body, headers, ...init } = {}) {
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  const hasJsonBody = body !== undefined && !isForm;

  let res;
  try {
    res = await fetch(`${env.VITE_API_URL}${path}`, {
      credentials: "include",
      ...init,
      headers: {
        ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
        "X-Requested-With": "autorob-web",
        ...headers,
      },
      body: hasJsonBody ? JSON.stringify(body) : body,
    });
  } catch {
    throw new ApiError(0, { code: "NETWORK" });
  }

  if (res.status === 401 && path.startsWith("/api/admin") && typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:unauthorized"));
  }
  const json = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, json?.error);
  return json?.data;
}

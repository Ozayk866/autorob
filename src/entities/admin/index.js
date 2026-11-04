import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api, ApiError } from "@/shared/api";

// Admin auth — kontrakt §5 (sessiya cookie), §9. Token yo'q: cookie httpOnly, `credentials: "include"`.

/** @typedef {{ id: string, name: string, email: string, mustChangePassword: boolean, lastLoginAt: string }} Admin */

/** @returns {Promise<Admin>} sessiya yo'q → 401 UNAUTHENTICATED */
export const getMe = () => api("/api/admin/auth/me");

/** Kirmagan bo'lsa xato emas, null qaytaradi */
export async function getMeOrNull() {
  try {
    return await getMe();
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return null;
    throw e;
  }
}

/**
 * Xatolar: 401 INVALID_CREDENTIALS, 423 ACCOUNT_LOCKED (details.lockedUntil), 429 TOO_MANY_REQUESTS.
 * @param {{ email: string, password: string, remember?: boolean }} body  remember — 30 kun
 * @returns {Promise<Admin>}
 */
export const login = (body) => api("/api/admin/auth/login", { method: "POST", body });
export const logout = () => api("/api/admin/auth/logout", { method: "POST" });
/** 204. Xato: 400 INVALID_PASSWORD (path: currentPassword) */
export const changePassword = (body) => api("/api/admin/auth/change-password", { method: "POST", body });

export const adminKeys = { all: ["admins"], me: ["admins", "me"], list: () => ["admins", "list"] };

// retry: false — server javob bermasa, login sahifasi darhol ko'rinsin
export const meQuery = () => ({
  queryKey: adminKeys.me,
  queryFn: getMeOrNull,
  staleTime: 5 * 60_000,
  retry: false,
});

// ⚠️ Adminlar ro'yxati va yangi admin qo'shish — backend'da HALI YO'Q (kontraktda endpoint yo'q).
// Backend qo'shgach shu yo'llarni tekshiring.
export const getAdmins = () => api("/api/admin/admins");
export const createAdmin = (body) => api("/api/admin/admins", { method: "POST", body });
export const deleteAdmin = (id) => api(`/api/admin/admins/${id}`, { method: "DELETE" });

export const useAdmins = () => useQuery({ queryKey: adminKeys.list(), queryFn: getAdmins });

export function useCreateAdminMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.list() }),
  });
}

export const loginSchema = z.object({
  email: z.string().trim().email("auth.errors.email"),
  password: z.string().min(1, "auth.errors.password"),
  remember: z.boolean().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "auth.errors.password"),
    newPassword: z.string().min(10, "auth.errors.passwordLength").max(200),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "auth.errors.passwordMatch",
  })
  .refine((v) => v.newPassword !== v.currentPassword, {
    path: ["newPassword"],
    message: "auth.errors.passwordSame",
  });

export const createAdminSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email("auth.errors.email"),
});

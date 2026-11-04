import { api, ApiError } from "@/shared/api";

// TODO: endpoint'larni backend kontraktiga qarab moslang

/** @typedef {{ id: string, email: string, name: string, mustChangePassword: boolean, createdAt: string }} Admin */

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

export const login = (body) => api("/api/admin/auth/login", { method: "POST", body });
export const logout = () => api("/api/admin/auth/logout", { method: "POST" });
export const changePassword = (body) => api("/api/admin/auth/change-password", { method: "POST", body });

export const getAdmins = () => api("/api/admin/admins");
/** Javobda bir martalik vaqtinchalik parol: { admin, tempPassword } */
export const createAdmin = (body) => api("/api/admin/admins", { method: "POST", body });
export const deleteAdmin = (id) => api(`/api/admin/admins/${id}`, { method: "DELETE" });

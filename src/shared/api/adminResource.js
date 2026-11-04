import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toQuery } from "@/shared/lib/query";
import { api } from "./client";

/**
 * Admin CRUD yo'llari (backend kontrakti §10): GET /, POST /, GET /:id, PATCH /:id, DELETE /:id, PATCH /reorder.
 * @param {string} path  masalan "solutions" → /api/admin/solutions
 * @param {{ paginated?: boolean }} [options]  paginated — ro'yxat `{ data, meta }` qaytaradi (maqolalar, media)
 */
export function adminResource(path, { paginated = false } = {}) {
  const base = `/api/admin/${path}`;
  return {
    list: (params) => api(base + toQuery(params), { withMeta: paginated }),
    get: (id) => api(`${base}/${id}`),
    create: (body) => api(base, { method: "POST", body }),
    update: (id, body) => api(`${base}/${id}`, { method: "PATCH", body }),
    remove: (id) => api(`${base}/${id}`, { method: "DELETE" }),
    /** @param {{ id: string, sortOrder: number }[]} items */
    reorder: (items) => api(`${base}/reorder`, { method: "PATCH", body: items }),
  };
}

/**
 * adminResource uchun TanStack Query hook'lari. O'zgarishdan keyin entity'ning barcha so'rovlari
 * (public ham) yangilanadi — `rootKey` bilan boshlanadigan hamma kalitlar.
 *   const solutionAdmin = createAdminHooks(adminResource("solutions"), ["solutions"]);
 *   const { data } = solutionAdmin.useList();
 * @param {ReturnType<typeof adminResource>} resource
 * @param {unknown[]} rootKey
 */
export function createAdminHooks(resource, rootKey) {
  const keys = {
    list: (params = {}) => [...rootKey, "admin", "list", params],
    one: (id) => [...rootKey, "admin", "one", id],
  };

  const useInvalidate = () => {
    const qc = useQueryClient();
    return () => qc.invalidateQueries({ queryKey: rootKey });
  };

  return {
    keys,
    useList: (params) => useQuery({ queryKey: keys.list(params), queryFn: () => resource.list(params) }),
    useOne: (id) =>
      useQuery({ queryKey: keys.one(id), queryFn: () => resource.get(id), enabled: Boolean(id) }),
    useCreate: () => useMutation({ mutationFn: resource.create, onSuccess: useInvalidate() }),
    useUpdate: () =>
      useMutation({ mutationFn: ({ id, ...body }) => resource.update(id, body), onSuccess: useInvalidate() }),
    useRemove: () => useMutation({ mutationFn: resource.remove, onSuccess: useInvalidate() }),
  };
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { useLocale } from "@/shared/i18n";
import { toQuery } from "@/shared/lib";

// Sahifa matnlari (admin tahrirlaydigan kalit → matn) — kontrakt §8 `GET /api/public/pages/:group`, §10 «Sahifa matnlari».
// ⚠️ Hozircha sayt bloklari STATIK (lug'atda). Bu entity matnni admin'dan boshqarish kerak bo'lganda ishlatiladi.

/** @returns {Promise<Record<string, string>>}  { "home.hero.lead": "..." } — kalit guruh nomi bilan boshlanadi */
export const getPageTexts = (group, lang) => api(`/api/public/pages/${group}` + toQuery({ lang }));

/** @returns {Promise<{ id, key, group, value, updatedAt, translationStatus }[]>} */
export const getPageTextsAdmin = (group) => api("/api/admin/pages" + toQuery({ group }));

/** Kalit bo'lmasa yaratiladi. key: "home.hero.lead", value: { uz, ru, "uz-Cyrl" } */
export const savePageText = ({ key, group, value }) =>
  api(`/api/admin/pages/${key}`, { method: "PUT", body: { group, value } });

export const pageContentKeys = {
  all: ["pages"],
  group: (group, lang) => ["pages", group, lang],
  admin: (group) => ["pages", "admin", group],
};

/**
 * const text = usePageTexts("home"); text("hero.lead", t("home.hero.lead"))
 * @param {string} group
 * @returns {(key: string, fallback?: string) => string}  key — guruhsiz qismi
 */
export function usePageTexts(group) {
  const lang = useLocale();
  const { data } = useQuery({
    queryKey: pageContentKeys.group(group, lang),
    queryFn: () => getPageTexts(group, lang),
    staleTime: 10 * 60_000,
  });
  return (key, fallback = "") => data?.[`${group}.${key}`] || fallback;
}

export const usePageTextsAdmin = (group) =>
  useQuery({ queryKey: pageContentKeys.admin(group), queryFn: () => getPageTextsAdmin(group) });

export function useSavePageText() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: savePageText,
    onSuccess: () => qc.invalidateQueries({ queryKey: pageContentKeys.all }),
  });
}

import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { adminResource, api, createAdminHooks } from "@/shared/api";
import { localizedText } from "@/shared/i18n";
import { toQuery } from "@/shared/lib";

// Blog kategoriyalari — kontrakt §8 `GET /api/public/post-categories`, §10 «Blog kategoriyalari»

/** @returns {Promise<{ id: string, slug: string, name: string }[]>} barchasi (maqolasi bo'lmaganlari ham) */
export const getPostCategories = (lang) => api("/api/public/post-categories" + toQuery({ lang }));

export const postCategoryKeys = {
  all: ["post-categories"],
  list: (lang) => ["post-categories", "list", lang],
};

export const usePostCategories = (lang) =>
  useQuery({
    queryKey: postCategoryKeys.list(lang),
    queryFn: () => getPostCategories(lang),
    staleTime: 10 * 60_000,
  });

/** Maqolasi bor kategoriyani o'chirish → 409 IN_USE */
export const postCategoryAdmin = createAdminHooks(adminResource("post-categories"), postCategoryKeys.all);

export const postCategorySchema = z.object({
  name: localizedText(true),
  slug: z
    .string()
    .regex(/^[a-z0-9-]*$/, "form.slug")
    .optional(),
});

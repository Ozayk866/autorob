import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { adminResource, api, createAdminHooks } from "@/shared/api";
import { localizedText } from "@/shared/i18n";
import { toQuery } from "@/shared/lib";

// FAQ — kontrakt §8 `GET /api/public/faq`, §10 «FAQ bo'limlari», «FAQ savollari»
// answer — HTML EMAS, oddiy matn: {answer} ko'rinishida chiqariladi (dangerouslySetInnerHTML ishlatilmaydi)

/** @typedef {{ id: string, question: string, answer: string }} FaqItem */
/** @typedef {{ id: string, name: string, items: FaqItem[] }} FaqCategory */

/**
 * Bo'limlar ichida savollar bilan (faqat faol savoli bor bo'limlar).
 * @param {{ category?: string }} [filters]  category — bo'lim UUID'si
 * @returns {Promise<FaqCategory[]>}
 */
export const getFaq = (lang, { category } = {}) => api("/api/public/faq" + toQuery({ lang, category }));

export const faqKeys = { all: ["faq"], list: (lang, filters = {}) => ["faq", "list", lang, filters] };

export const faqQuery = (lang, filters) => ({
  queryKey: faqKeys.list(lang, filters),
  queryFn: () => getFaq(lang, filters),
});
export const useFaq = (lang, filters) => useQuery(faqQuery(lang, filters));

/** Admin: bo'limlar. O'chirilsa — uning savollari ham o'chadi. */
export const faqCategoryAdmin = createAdminHooks(adminResource("faq-categories"), faqKeys.all);
/** Admin: savollar. useList({ categoryId }) */
export const faqItemAdmin = createAdminHooks(adminResource("faq-items"), faqKeys.all);

export const faqCategorySchema = z.object({ name: localizedText(true) });

export const faqItemSchema = z.object({
  categoryId: z.string().uuid(),
  question: localizedText(true),
  answer: localizedText(true),
  isActive: z.boolean(),
  solutionIds: z.array(z.string().uuid()).max(50), // savol shu yechim sahifalarida ham chiqadi
});

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@/shared/i18n";
import { pageTextsQuery } from "./queries";

/**
 * Admin tahrirlaydigan sahifa matnlari (bazadan).
 * const text = usePageTexts("home"); text("hero.title")
 * @param {string} page
 */
export function usePageTexts(page) {
  const lang = useLocale();
  const { data } = useQuery(pageTextsQuery(page, lang));
  return (key) => data?.[key] ?? "";
}

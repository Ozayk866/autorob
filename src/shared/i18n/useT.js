import { useCallback } from "react";
import { useLocale } from "./useLocale";
import uz from "./dictionaries/uz.json";
import uzCyrl from "./dictionaries/uz-Cyrl.json";
import ru from "./dictionaries/ru.json";

const DICTIONARIES = { uz, "uz-Cyrl": uzCyrl, ru };
const get = (obj, key) => key.split(".").reduce((o, k) => o?.[k], obj);

/** UI matnlari: t("lead.submit"). Topilmasa — uz, keyin kalitning o'zi. */
export function useT() {
  const lang = useLocale();
  return useCallback((key) => get(DICTIONARIES[lang], key) ?? get(DICTIONARIES.uz, key) ?? key, [lang]);
}

import { useEffect } from "react";
import { useLocation } from "react-router";
import { LocaleContext } from "./LocaleContext";
import { HTML_LANG } from "./locales";

/** Tilni manzildan oladi: "/ru/..." → ru, "/uz-cyrl/..." → uz-Cyrl, qolgani → uz */
export function LocaleProvider({ children }) {
  const { pathname } = useLocation();
  const locale = pathname.startsWith("/ru") ? "ru" : pathname.startsWith("/uz-cyrl") ? "uz-Cyrl" : "uz";

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

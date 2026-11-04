import { useEffect } from "react";
import { useParams } from "react-router";
import { LocaleContext } from "./LocaleContext";
import { DEFAULT_LOCALE, HTML_LANG, localeFromParam } from "./locales";

/** Tilni URL'dan (`:lang?`) oladi. Sayt route'ida ishlatiladi; admin har doim uz. */
export function LocaleProvider({ children }) {
  const { lang } = useParams();
  const locale = localeFromParam(lang) ?? DEFAULT_LOCALE;

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

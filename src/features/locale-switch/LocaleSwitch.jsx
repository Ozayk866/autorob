import { Link, useLocation } from "react-router";
import { HTML_LANG, LOCALES, localizePath, stripLocale, useLocale } from "@/shared/i18n";
import { cn, track } from "@/shared/lib";
import styles from "./LocaleSwitch.module.css";

// Til nomlari har doim o'z yozuvida ko'rsatiladi
const LABELS = { uz: "O'z", "uz-Cyrl": "Ўз", ru: "Ру" };

/** Joriy sahifaning boshqa tildagi manziliga o'tkazadi (query saqlanadi) */
export function LocaleSwitch() {
  const lang = useLocale();
  const { pathname, search } = useLocation();
  const base = stripLocale(pathname);

  return (
    <nav className={styles.root}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          to={localizePath(base, l) + search}
          hrefLang={HTML_LANG[l]}
          aria-current={l === lang ? "true" : undefined}
          className={cn(styles.item, l === lang && styles.active)}
          onClick={() => track("locale_changed", { to: l })}
        >
          {LABELS[l]}
        </Link>
      ))}
    </nav>
  );
}

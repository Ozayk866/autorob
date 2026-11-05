import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { HTML_LANG, LOCALES, localizePath, stripLocale, useLocale } from "@/i18n";
import { cn } from "@/components/cn";
import { Icon } from "@/components/Icon/Icon";
import "./LocaleSwitch.css";

// Til nomlari har doim o'z yozuvida ko'rsatiladi
const CODES = { uz: "UZ", "uz-Cyrl": "ЎЗ", ru: "RU" };
const NAMES = { uz: "O'zbekcha", "uz-Cyrl": "Ўзбекча", ru: "Русский" };

/**
 * Til tanlash ro'yxati. Joriy sahifaning boshqa tildagi manziliga o'tkazadi (query saqlanadi).
 * @param {{ placement?: "down" | "up", className?: string }} props  up — ekran pastida (mobil menyu)
 */
export function LocaleSwitch({ placement = "down", className }) {
  const lang = useLocale();
  const { pathname, search } = useLocation();
  const base = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("locale-switch", className)}>
      <button
        type="button"
        className="locale-switch-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="globe" size={18} />
        <span>{CODES[lang]}</span>
        <Icon
          name="chevron-down"
          size={16}
          className={cn("locale-switch-chevron", open && "locale-switch-chevron-open")}
        />
      </button>

      {open && (
        <ul id={menuId} className={cn("locale-switch-menu", `locale-switch-${placement}`)}>
          {LOCALES.map((l) => (
            <li key={l}>
              <Link
                to={localizePath(base, l) + search}
                hrefLang={HTML_LANG[l]}
                lang={HTML_LANG[l]}
                aria-current={l === lang ? "true" : undefined}
                className={cn("locale-switch-item", l === lang && "locale-switch-active")}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <span className="locale-switch-code">{CODES[l]}</span>
                {NAMES[l]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

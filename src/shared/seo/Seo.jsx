import { useLocation } from "react-router";
import { env } from "@/shared/config/env";
import { HTML_LANG, LOCALES, localizePath, stripLocale, useLocale } from "@/shared/i18n";

/**
 * Sahifa meta teglari. React 19 ularni <head> ga o'zi ko'taradi (prerender'da ham).
 * @param {{ title?: string, description?: string, image?: string, type?: "website" | "article", noindex?: boolean }} props
 */
export function Seo({ title, description, image = "/og-default.jpg", type = "website", noindex = false }) {
  const lang = useLocale();
  // "/ru/yechimlar/" va "/ru/yechimlar" — bitta sahifa, canonical oxirgi "/" siz
  const path = stripLocale(useLocation().pathname.replace(/(.)\/+$/, "$1"));
  const url = (l) => env.VITE_SITE_URL + localizePath(path, l);
  const fullTitle = title ? `${title} — AUTOROB` : "AUTOROB";

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={url(lang)} />
      {LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={HTML_LANG[l]} href={url(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url("uz")} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url(lang)} />
      <meta property="og:image" content={new URL(image, env.VITE_SITE_URL).href} />
    </>
  );
}

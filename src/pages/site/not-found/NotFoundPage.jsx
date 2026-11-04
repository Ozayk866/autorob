import { Link } from "react-router";
import { routes } from "@/shared/config";
import { useLocale, useT } from "@/shared/i18n";
import { Seo } from "@/shared/seo";

/** TODO: Figma'dagi 404 dizayni */
export function NotFoundPage() {
  const lang = useLocale();
  const t = useT();
  return (
    <section className="container">
      <Seo title={t("notFound.title")} noindex />
      <h1>{t("notFound.title")}</h1>
      <Link to={routes.home(lang)}>{t("notFound.home")}</Link>
    </section>
  );
}

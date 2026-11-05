import { routes, useLocale, useT } from "@/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Icon } from "@/components/Icon/Icon";
import "./PageHero.css";

/**
 * Ichki sahifalar boshi (Katalog, Blog, FAQ, Kontaktlar, Biz haqimizda): qorong'i fon, breadcrumbs,
 * sarlavha (h1), matn, o'ngda ko'k doira ichida ikonka.
 *   <PageHero title="Blog" subtitle="..." icon="book-open" />
 * «Bosh sahifa» breadcrumb'i o'zi qo'shiladi; `breadcrumbs` — undan keyingilari (oxirgisi odatda title).
 * @param {{ title: string, subtitle?: string, icon?: string, breadcrumbs?: { label: string, to?: string }[] }} props
 */
export function PageHero({ title, subtitle, icon, breadcrumbs }) {
  const t = useT();
  const lang = useLocale();
  const items = [{ label: t("nav.home"), to: routes.home(lang) }, ...(breadcrumbs ?? [{ label: title }])];

  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <Breadcrumbs items={items} />
          <h1 className="page-hero-title">{title}</h1>
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        </div>
        {icon && (
          <div className="page-hero-art" aria-hidden="true">
            <span className="page-hero-circle">
              <Icon name={icon} size={30} />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

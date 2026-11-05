import { routes } from "@/shared/config";
import { useLocale, useT } from "@/shared/i18n";
import { Breadcrumbs, Icon } from "@/shared/ui";
import styles from "./PageHero.module.css";

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
    <section className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Breadcrumbs items={items} />
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {icon && (
          <div className={styles.art} aria-hidden="true">
            <span className={styles.circle}>
              <Icon name={icon} size={30} />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

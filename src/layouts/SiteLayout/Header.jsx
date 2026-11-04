import { Link, NavLink } from "react-router";
import { routes } from "@/shared/config";
import { useLocale, useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import styles from "./SiteLayout.module.css";

const NAV = [
  { key: "nav.solutions", to: routes.solutions },
  { key: "nav.about", to: routes.about },
  { key: "nav.blog", to: routes.blog },
  { key: "nav.faq", to: routes.faq },
  { key: "nav.contacts", to: routes.contacts },
];

/** TODO: Logo, CTA tugmasi (useLeadModal().open), mobil menyu tugmasi → MobileMenu */
export function Header() {
  const lang = useLocale();
  const t = useT();

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.headerInner)}>
        <Link to={routes.home(lang)}>AUTOROB</Link>
        <nav className={styles.nav}>
          {NAV.map((item) => (
            <NavLink
              key={item.key}
              to={item.to(lang)}
              className={({ isActive }) => cn(styles.navLink, isActive && styles.navLinkActive)}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

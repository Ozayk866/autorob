import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useLeadModal } from "@/features/lead-form";
import { LocaleSwitch } from "@/features/locale-switch";
import { routes } from "@/shared/config";
import { useLocale, useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Button, Icon, Logo } from "@/shared/ui";
import { MobileMenu } from "./MobileMenu";
import { SITE_NAV } from "./nav.config";
import styles from "./Header.module.css";

/** Figma: Header (4:40) — logo | menyu | til + «Ma'lumot qoldirish». 1024px dan kichikda menyu MobileMenu'ga o'tadi. */
export function Header() {
  const lang = useLocale();
  const t = useT();
  const { open: openLead } = useLeadModal();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTop, setMenuTop] = useState();
  const headerRef = useRef(null);

  // Sahifa almashsa mobil menyu yopiladi
  useEffect(() => setMenuOpen(false), [pathname]);

  const toggleMenu = () => {
    setMenuTop(headerRef.current?.getBoundingClientRect().bottom);
    setMenuOpen((v) => !v);
  };
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header ref={headerRef} className={styles.root}>
      <div className={cn("container", styles.inner)}>
        <Link to={routes.home(lang)} className={styles.logo} aria-label="AUTOROB">
          <Logo />
        </Link>

        <nav className={styles.nav}>
          {SITE_NAV.map((item) => (
            <NavLink
              key={item.key}
              to={item.to(lang)}
              className={({ isActive }) => cn(styles.navLink, isActive && styles.navLinkActive)}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <LocaleSwitch className={styles.locale} />
          <Button size="lg" className={styles.cta} onClick={() => openLead()}>
            {t("lead.cta")}
          </Button>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={t(menuOpen ? "nav.closeMenu" : "nav.openMenu")}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={menuOpen} top={menuTop} onClose={closeMenu} />
    </header>
  );
}

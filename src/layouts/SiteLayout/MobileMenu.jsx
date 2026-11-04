import { useEffect } from "react";
import { NavLink } from "react-router";
import { useLeadModal } from "@/features/lead-form";
import { LocaleSwitch } from "@/features/locale-switch";
import { useLocale, useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { SITE_NAV } from "./nav.config";
import styles from "./MobileMenu.module.css";

/**
 * Header ostidan ochiladigan menyu (1024px dan kichik ekranlar). Esc bilan yopiladi, ochiqligida sahifa scroll bo'lmaydi.
 * @param {{ isOpen: boolean, onClose: () => void, top?: number }} props  top — Header'ning pastki cheti (px)
 */
export function MobileMenu({ isOpen, onClose, top }) {
  const lang = useLocale();
  const t = useT();
  const { open: openLead } = useLeadModal();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.root} style={top !== undefined ? { top } : undefined}>
      <nav className={cn("container", styles.nav)}>
        {SITE_NAV.map((item) => (
          <NavLink
            key={item.key}
            to={item.to(lang)}
            className={({ isActive }) => cn(styles.link, isActive && styles.linkActive)}
          >
            {t(item.key)}
          </NavLink>
        ))}
      </nav>
      <div className={cn("container", styles.footer)}>
        <LocaleSwitch placement="up" />
        <Button
          size="lg"
          className={styles.cta}
          onClick={() => {
            onClose();
            openLead();
          }}
        >
          {t("lead.cta")}
        </Button>
      </div>
    </div>
  );
}

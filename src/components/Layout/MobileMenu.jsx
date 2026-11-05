import { useEffect } from "react";
import { NavLink } from "react-router";
import { useLeadModal } from "@/components/LeadForm/useLeadModal";
import { LocaleSwitch } from "@/components/LocaleSwitch/LocaleSwitch";
import { useLocale, useT } from "@/i18n";
import { cn } from "@/components/cn";
import { Button } from "@/components/Button/Button";
import { SITE_NAV } from "./nav.config";
import "./MobileMenu.css";

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
    <div className="mobile-menu" style={top !== undefined ? { top } : undefined}>
      <nav className="container mobile-menu-nav">
        {SITE_NAV.map((item) => (
          <NavLink
            key={item.key}
            to={item.to(lang)}
            className={({ isActive }) => cn("mobile-menu-link", isActive && "mobile-menu-link-active")}
          >
            {t(item.key)}
          </NavLink>
        ))}
      </nav>
      <div className="container mobile-menu-footer">
        <LocaleSwitch placement="up" />
        <Button
          size="lg"
          className="mobile-menu-cta"
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

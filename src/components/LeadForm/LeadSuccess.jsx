import { useEffect, useRef } from "react";
import { useT } from "@/i18n";
import { cn } from "@/components/cn";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import "./LeadForm.css";

/**
 * «Rahmat, Aziz!» — ariza qabul qilindi. Modalda «Yopish», sahifadagi formada «Yana ariza yuborish».
 * @param {{ name: string, phone: string, theme: "light" | "dark", onClose?: () => void, onReset: () => void }} props
 */
export function LeadSuccess({ name, phone, theme, onClose, onReset }) {
  const t = useT();
  const titleRef = useRef(null);

  // Ekran o'quvchi va klaviatura uchun fokus natijaga o'tadi
  useEffect(() => titleRef.current?.focus(), []);

  const [before, after] = t("lead.success.text").split("{phone}");

  return (
    <div className={cn("lead-form-success", theme === "dark" && "lead-form-success-dark")} role="status">
      <span className="lead-form-success-icon">
        <Icon name="check" size={28} />
      </span>
      <h2 ref={titleRef} tabIndex={-1} className="lead-form-success-title">
        {t("lead.success.title", { name })}
      </h2>
      <p className="lead-form-success-text">
        {before}
        <strong>{phone}</strong>
        {after}
      </p>
      {onClose ? (
        <Button variant="secondary" size="lg" block onClick={onClose} className="lead-form-success-action">
          {t("common.close")}
        </Button>
      ) : (
        <button type="button" className="lead-form-again" onClick={onReset}>
          {t("lead.success.again")}
        </button>
      )}
    </div>
  );
}

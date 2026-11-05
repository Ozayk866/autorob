import { useId, useState } from "react";
import { Link } from "react-router";
import { solutions } from "@/data/solutions";
import { routes, useLocale, useT } from "@/i18n";
import { cn } from "@/components/cn";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { Textarea } from "@/components/Textarea/Textarea";
import { formatPhone, isFullPhone, maskPhoneInput } from "./phone";
import { LeadSuccess } from "./LeadSuccess";
import "./LeadForm.css";

/**
 * Ariza formasi.
 * - modal    — oq fon: ism, telefon, yechim tanlash
 * - inline   — qorong'i fon (CtaBand): ism, telefon (+ yechim — showSolutionSelect)
 * - contacts — oq fon (Kontaktlar sahifasi): ism, telefon, izoh
 */
export function LeadForm({
  variant = "inline",
  title,
  subtitle,
  titleId,
  solutionId = "",
  defaultMessage = "",
  showSolutionSelect = variant === "modal",
  onClose,
}) {
  const t = useT();
  const lang = useLocale();
  const theme = variant === "inline" ? "dark" : "light";

  const [values, setValues] = useState({ name: "", phone: "", solutionId, message: defaultMessage });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null); // { name, phone } — yuborilgandan keyin

  const change = (field, value) => setValues((v) => ({ ...v, [field]: value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = {};
    if (values.name.trim().length < 2) found.name = t("lead.errors.name");
    if (!isFullPhone(values.phone)) found.phone = t("lead.errors.phone");
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    // TODO: backend qo'shilganda shu yerda arizani yuborish: await fetch("/api/public/leads", { method: "POST", … })
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSending(false);
    setSent({ name: values.name.trim(), phone: formatPhone(values.phone) });
  }

  if (sent) {
    return (
      <LeadSuccess
        {...sent}
        theme={theme}
        onClose={onClose}
        onReset={() => {
          setSent(null);
          setValues({ name: "", phone: "", solutionId, message: "" });
        }}
      />
    );
  }

  return (
    <form className={cn("lead-form", `lead-form-${variant}`)} onSubmit={onSubmit} noValidate>
      {title && (
        <div className="lead-form-header">
          <h2 id={titleId} className="lead-form-title">
            {title}
          </h2>
          {subtitle && <p className="lead-form-subtitle">{subtitle}</p>}
        </div>
      )}

      <Field label={t("lead.name")} error={errors.name} theme={theme}>
        {(a11y) => (
          <Input
            {...a11y}
            theme={theme}
            autoComplete="name"
            placeholder={t("lead.namePlaceholder")}
            value={values.name}
            onChange={(e) => change("name", e.target.value)}
          />
        )}
      </Field>

      <Field label={t("lead.phone")} error={errors.phone} theme={theme}>
        {(a11y) => (
          <Input
            {...a11y}
            theme={theme}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t("lead.phonePlaceholder")}
            value={values.phone}
            onChange={(e) => change("phone", maskPhoneInput(e.target.value))}
          />
        )}
      </Field>

      {showSolutionSelect && (
        <Field label={t("lead.solution")} theme={theme}>
          {(a11y) => (
            <Select
              {...a11y}
              theme={theme}
              placeholder={t(
                variant === "modal" ? "lead.solutionPlaceholder" : "lead.solutionPlaceholderLong",
              )}
              options={solutions.map((s) => ({ value: s.slug, label: s.title }))}
              value={values.solutionId}
              onChange={(e) => change("solutionId", e.target.value)}
            />
          )}
        </Field>
      )}

      {variant === "contacts" && (
        <Field label={t("lead.message")} theme={theme}>
          {(a11y) => (
            <Textarea
              {...a11y}
              theme={theme}
              placeholder={t("lead.messagePlaceholder")}
              value={values.message}
              onChange={(e) => change("message", e.target.value)}
            />
          )}
        </Field>
      )}

      <Button type="submit" size="lg" block disabled={sending} className="lead-form-submit">
        {sending ? (
          <>
            <Icon name="loader" size={18} className="lead-form-spinner" />
            {t("lead.submitting")}
          </>
        ) : (
          <>
            {t("lead.submit")}
            <Icon name="arrow-right" size={18} />
          </>
        )}
      </Button>

      <p className="lead-form-consent">
        {t("lead.consent.before")}{" "}
        <Link to={routes.privacy(lang)} className="lead-form-consent-link">
          {t("lead.consent.link")}
        </Link>{" "}
        {t("lead.consent.after")}
      </p>
    </form>
  );
}

/** Label + maydon + xato matni */
function Field({ label, error, theme, children }) {
  const id = useId();
  const a11y = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };

  return (
    <div className={cn("field", theme === "dark" && "field-dark")}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children(a11y)}
      {error && (
        <p id={`${id}-error`} className="field-error">
          <Icon name="alert-circle" size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

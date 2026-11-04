import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { useSolutions } from "@/entities/solution";
import { routes } from "@/shared/config";
import { FormField, setServerErrors } from "@/shared/form";
import { useLocale, useT } from "@/shared/i18n";
import { cn, formatPhone, maskPhoneInput } from "@/shared/lib";
import { Button, Icon, Input, Select, Textarea } from "@/shared/ui";
import { leadSchema } from "./schema";
import { leadErrorKey, useSubmitLead } from "./useSubmitLead";
import { LeadError } from "./LeadError";
import { LeadSuccess } from "./LeadSuccess";
import styles from "./LeadForm.module.css";

/**
 * Ariza formasi (docs/tz/10-ariza-formasi.md).
 * - modal    — oq fon: ism, telefon, yechim tanlash
 * - inline   — qorong'i fon (CtaBand): ism, telefon (+ yechim — showSolutionSelect)
 * - contacts — oq fon (Kontaktlar sahifasi): ism, telefon, izoh
 * @param {{
 *   variant?: "modal" | "inline" | "contacts",
 *   title?: string, subtitle?: string, titleId?: string,
 *   solutionId?: string, defaultMessage?: string, showSolutionSelect?: boolean,
 *   onClose?: () => void,
 * }} props  onClose — muvaffaqiyat oynasidagi «Yopish» (modal uchun)
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
  const submit = useSubmitLead();
  const [sent, setSent] = useState(null); // { name, phone } — muvaffaqiyatdan keyin
  const { data: solutions = [] } = useSolutions(lang);

  const form = useForm({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", solutionId, message: defaultMessage, website: "" },
  });
  const { errors } = form.formState;

  const onSubmit = (values) =>
    submit.mutate(values, {
      onSuccess: () => setSent({ name: values.name, phone: formatPhone(values.phone) }),
      onError: (error) => setServerErrors(form.setError, error),
    });

  if (sent) {
    return (
      <LeadSuccess
        {...sent}
        theme={theme}
        onClose={onClose}
        onReset={() => {
          setSent(null);
          submit.reset();
          form.reset();
        }}
      />
    );
  }

  // Maydon xatosi bo'lmagan server xatosi (429, tarmoq, 500) — forma ustida
  const generalError =
    submit.isError && !Object.keys(errors).some((name) => errors[name]?.type === "server")
      ? leadErrorKey(submit.error)
      : null;

  return (
    <form className={cn(styles.root, styles[variant])} onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {title && (
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <FormField label={t("lead.name")} error={errors.name} theme={theme}>
        <Input
          theme={theme}
          autoComplete="name"
          placeholder={t("lead.namePlaceholder")}
          {...form.register("name")}
        />
      </FormField>

      <FormField label={t("lead.phone")} error={errors.phone} theme={theme}>
        {(a11y) => (
          <Controller
            name="phone"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                {...a11y}
                theme={theme}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={t("lead.phonePlaceholder")}
                onChange={(e) => field.onChange(maskPhoneInput(e.target.value))}
              />
            )}
          />
        )}
      </FormField>

      {showSolutionSelect && (
        <FormField label={t("lead.solution")} error={errors.solutionId} theme={theme}>
          {(a11y) => (
            <Controller
              name="solutionId"
              control={form.control}
              render={({ field }) => (
                <Select
                  {...field}
                  {...a11y}
                  theme={theme}
                  placeholder={t(
                    variant === "modal" ? "lead.solutionPlaceholder" : "lead.solutionPlaceholderLong",
                  )}
                  options={solutions.map((s) => ({ value: s.id, label: s.title }))}
                />
              )}
            />
          )}
        </FormField>
      )}

      {variant === "contacts" && (
        <FormField label={t("lead.message")} error={errors.message} theme={theme}>
          <Textarea theme={theme} placeholder={t("lead.messagePlaceholder")} {...form.register("message")} />
        </FormField>
      )}

      {/* Honeypot: odam ko'rmaydi va to'ldirmaydi, bot to'ldiradi — backend bunday arizani Telegram'ga yubormaydi */}
      <input
        type="text"
        className="visually-hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...form.register("website")}
      />

      {generalError && <LeadError messageKey={generalError} theme={theme} />}

      <Button type="submit" size="lg" block disabled={submit.isPending} className={styles.submit}>
        {submit.isPending ? (
          <>
            <Icon name="loader" size={18} className={styles.spinner} />
            {t("lead.submitting")}
          </>
        ) : (
          <>
            {t("lead.submit")}
            <Icon name="arrow-right" size={18} />
          </>
        )}
      </Button>

      <p className={styles.consent}>
        {t("lead.consent.before")}{" "}
        <Link to={routes.privacy(lang)} className={styles.consentLink}>
          {t("lead.consent.link")}
        </Link>{" "}
        {t("lead.consent.after")}
      </p>
    </form>
  );
}

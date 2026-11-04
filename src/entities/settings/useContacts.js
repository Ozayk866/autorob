import { SITE_CONTACTS } from "@/shared/config";
import { useLocale, useT } from "@/shared/i18n";
import { formatPhone, normalizePhone } from "@/shared/lib";
import { useSettings } from "./queries";

/**
 * Kontaktlar (TopBar, Footer, Kontaktlar sahifasi uchun): backend sozlamalari, bo'lmasa standart qiymatlar.
 * Backend javobi (public): { phone, telegram, address, workHours } — tarjima maydonlari oddiy string.
 */
export function useContacts() {
  const lang = useLocale();
  const t = useT();
  const { data } = useSettings(lang);

  const phone = normalizePhone(data?.phone || SITE_CONTACTS.phone);
  const telegram = (data?.telegram || SITE_CONTACTS.telegram).replace(/^@/, "");

  return {
    phone: formatPhone(phone),
    phoneHref: `tel:+${phone}`,
    telegram: `@${telegram}`,
    telegramHref: `https://t.me/${telegram}`,
    address: data?.address || t("contacts.address"),
    workHours: data?.workHours || t("contacts.workHours"),
  };
}

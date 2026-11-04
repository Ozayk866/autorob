import { SITE_CONTACTS } from "@/shared/config";
import { useLocale, useT } from "@/shared/i18n";
import { formatPhone, normalizePhone } from "@/shared/lib";
import { useSettings } from "./queries";

/**
 * Kontaktlar (TopBar, Footer, Kontaktlar sahifasi): backend sozlamalari, bo'lmasa standart qiymatlar.
 * Backend: phone "+998 90 123 45 67", telegram "@autorob_uz", address/workHours — tanlangan tildagi qator.
 */
export function useContacts() {
  const lang = useLocale();
  const t = useT();
  const { data } = useSettings(lang);

  const phone = normalizePhone(data?.phone || SITE_CONTACTS.phone);
  const telegram = (data?.telegram || SITE_CONTACTS.telegram).replace(/^@/, "");
  const email = data?.email || SITE_CONTACTS.email;

  return {
    phone: formatPhone(phone),
    phoneHref: `tel:+${phone}`,
    telegram: `@${telegram}`,
    telegramHref: `https://t.me/${telegram}`,
    email,
    emailHref: email ? `mailto:${email}` : null,
    address: data?.address || t("contacts.address"),
    workHours: data?.workHours || t("contacts.workHours"),
    /** @type {{ lat: number, lng: number } | null} */
    map: data?.map ?? null,
    /** @type {Record<string, string>} { instagram: "https://..." } */
    socials: data?.socials ?? {},
  };
}

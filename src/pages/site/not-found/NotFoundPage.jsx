import { routes } from "@/shared/config";
import { useLocale } from "@/shared/i18n";
import { Seo } from "@/shared/seo";
import { Button, Icon } from "@/shared/ui";
import "./NotFoundPage.css";

// 404 sahifa — topshiriq: docs/tz/word/09_404_va_Maxfiylik_Islomjon.docx
// Klass nomlari «notfound-» bilan boshlanadi (NotFoundPage.css)

export function NotFoundPage() {
  const lang = useLocale();

  return (
    <>
      {/* noindex — 404 sahifa Google'da chiqmasin. Bu qatorni o'chirmang */}
      <Seo title="Sahifa topilmadi" noindex />
    </>
  );
}

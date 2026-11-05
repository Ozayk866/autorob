import { Seo } from "@/shared/seo";
import { PageHero } from "@/widgets/site/page-hero";
import { ContactsInfo } from "./ContactsInfo";
import { ContactsForm } from "./ContactsForm";
import { ContactsMap } from "./ContactsMap";
import "./ContactsPage.css";

// Kontaktlar — topshiriq: docs/tz/word/08_Kontaktlar_Dilmurod.docx
// Har bo'lim — alohida fayl (shu papkada). Stillar — ContactsPage.css, klasslar «contacts-»

export function ContactsPage() {
  return (
    <>
      <Seo />
      <PageHero />
      {/* chapda kontaktlar, o'ngda forma — .contacts-layout ni CSS'da 2 ustun qilasiz */}
      <div className="container contacts-layout">
        <ContactsInfo />
        <ContactsForm />
      </div>
      <ContactsMap />
    </>
  );
}

import { useState } from "react";
import { faq as categories } from "@/data/faq";
import { useLocale } from "@/i18n";
import { PageHero } from "@/components";
import { FaqCategories } from "./FaqCategories";
import { FaqQuestions } from "./FaqQuestions";
import { FaqHelp } from "./FaqHelp";
import "./FaqPage.css";

// FAQ — topshiriq: docs/tz/word/07_FAQ_Islombek.docx
// Har bo'lim — alohida fayl (shu papkada). Stillar — FaqPage.css, klasslar «faq-»

export function FaqPage() {
  const lang = useLocale();
  const [active, setActive] = useState(0); // tanlangan bo'lim tartib raqami
  const current = categories[active];

  return (
    <>
      <PageHero />
      {/* chapda bo'limlar, o'ngda savollar — .faq-layout ni CSS'da 2 ustun qilasiz */}
      <div className="container faq-layout">
        <FaqCategories categories={categories} active={active} setActive={setActive} />
        <FaqQuestions items={current?.items ?? []} />
      </div>
      <FaqHelp />
    </>
  );
}

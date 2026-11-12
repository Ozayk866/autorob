import { CtaBand, PageHero } from "@/components";
import { CatalogFilter } from "./CatalogFilter";
import { CatalogGrid } from "./CatalogGrid";
import "./SolutionsPage.css";

// Yechimlar katalogi — topshiriq: docs/tz/word/02_Yechimlar_katalogi_Behruz.docx
// Har bo'lim — alohida fayl (shu papkada). Stillar — SolutionsPage.css, klasslar «catalog-»

export function SolutionsPage() {
  return (
    <>
      <PageHero  title="Yechimlar katalogi" subtitle="CRM'dan to'liq avtomatlashtirilgan stanok liniyasigacha — biznesingiz bosqichiga mos yechimni tanlang." icon="layers"/>
      <CatalogFilter />
      <CatalogGrid />
      <CtaBand />
    </>
  );
}

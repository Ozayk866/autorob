import { Seo } from "@/shared/seo";
import { CtaBand } from "@/widgets/site/cta-band";
import { PageHero } from "@/widgets/site/page-hero";
import { CatalogFilter } from "./CatalogFilter";
import { CatalogGrid } from "./CatalogGrid";
import "./SolutionsPage.css";

// Yechimlar katalogi — topshiriq: docs/tz/word/02_Yechimlar_katalogi_Behruz.docx
// Har bo'lim — alohida fayl (shu papkada). Stillar — SolutionsPage.css, klasslar «catalog-»

export function SolutionsPage() {
  return (
    <>
      <Seo />
      <PageHero />
      <CatalogFilter />
      <CatalogGrid />
      <CtaBand />
    </>
  );
}

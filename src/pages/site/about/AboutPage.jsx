import { Seo } from "@/shared/seo";
import { CtaBand } from "@/widgets/site/cta-band";
import { PageHero } from "@/widgets/site/page-hero";
import { AboutMission } from "./AboutMission";
import { AboutHistory } from "./AboutHistory";
import { AboutTeam } from "./AboutTeam";
import { AboutTrust } from "./AboutTrust";
import "./AboutPage.css";

// Biz haqimizda — topshiriq: docs/tz/word/04_Biz_haqimizda_Xolmirzayev.docx
// Har bo'lim — alohida fayl (shu papkada). Stillar — AboutPage.css, klasslar «about-»

export function AboutPage() {
  return (
    <>
      <Seo />
      <PageHero />
      <AboutMission />
      <AboutHistory />
      <AboutTeam />
      <AboutTrust />
      <CtaBand />
    </>
  );
}

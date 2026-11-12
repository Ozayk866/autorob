import { CtaBand, PageHero } from "@/components";
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
      <PageHero title="Biz haqimizda" subtitle="AUTOROB — O'zbekiston bizneslari uchun avtomatlashtirish varobotlashtirish yechimlarini yaratuvchi jamoa." icon="award"/>
      <AboutMission />
      <AboutHistory />
      <AboutTeam />
      <AboutTrust />
      <CtaBand />
    </>
  );
}

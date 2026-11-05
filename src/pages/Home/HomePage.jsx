import { useT } from "@/i18n";
import { HeroSlider } from "./HeroSlider";
import { StatsRow } from "./StatsRow";
import { SolutionsPath } from "./SolutionsPath";
import { AudienceCards } from "./AudienceCards";
import { Advantages } from "./Advantages";
import { PartnersStrip } from "./PartnersStrip";
import { BlogPreview } from "./BlogPreview";
import { CtaBand } from "@/components";

/** Bosh sahifa (dizayn: «Bosh sahifa — Desktop 1440»). Har bo'lim — alohida widget. */
export function HomePage() {
  const t = useT();

  return (
    <>
      <HeroSlider />
      <StatsRow />
      <SolutionsPath />
      <AudienceCards />
      <Advantages />
      <PartnersStrip />
      <BlogPreview />
      <CtaBand showContacts showSolutionSelect />
    </>
  );
}

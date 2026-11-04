import { Seo } from "@/shared/seo";
import { HeroSlider } from "@/widgets/site/hero-slider";
import { SolutionsPath } from "@/widgets/site/solutions-path";
import { AudienceCards } from "@/widgets/site/audience";
import { Advantages } from "@/widgets/site/advantages";
import { StatsRow } from "@/widgets/site/stats-row";
import { PartnersStrip } from "@/widgets/site/partners-strip";
import { BlogPreview } from "@/widgets/site/blog-preview";
import { CtaBand } from "@/widgets/site/cta-band";

/** TODO: bosh sahifa; Seo title/description — t("home.seo.*") — docs/tz/01-bosh-sahifa.md */
export function HomePage() {
  return (
    <>
      <Seo />
      <HeroSlider />
      <SolutionsPath />
      <AudienceCards />
      <Advantages />
      <StatsRow />
      <PartnersStrip />
      <BlogPreview />
      <CtaBand />
    </>
  );
}

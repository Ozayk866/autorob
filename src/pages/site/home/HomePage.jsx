import { useT } from "@/shared/i18n";
import { organizationLd, Seo } from "@/shared/seo";
import { HeroSlider } from "@/widgets/site/hero-slider";
import { StatsRow } from "@/widgets/site/stats-row";
import { SolutionsPath } from "@/widgets/site/solutions-path";
import { AudienceCards } from "@/widgets/site/audience";
import { Advantages } from "@/widgets/site/advantages";
import { PartnersStrip } from "@/widgets/site/partners-strip";
import { BlogPreview } from "@/widgets/site/blog-preview";
import { CtaBand } from "@/widgets/site/cta-band";

/** Bosh sahifa (dizayn: «Bosh sahifa — Desktop 1440»). Har bo'lim — alohida widget. */
export function HomePage() {
  const t = useT();

  return (
    <>
      <Seo title={t("home.seo.title")} description={t("home.seo.description")} />
      <script type="application/ld+json">{JSON.stringify(organizationLd())}</script>
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

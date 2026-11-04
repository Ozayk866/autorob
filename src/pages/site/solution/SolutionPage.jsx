import { Seo } from "@/shared/seo";
import { SolutionHero } from "@/widgets/site/solution-hero";
import { ProcessTimeline } from "@/widgets/site/process-timeline";
import { FaqAccordion } from "@/widgets/site/faq-accordion";
import { CtaBand } from "@/widgets/site/cta-band";

/** TODO: /yechimlar/:slug — topilmasa NotFound; Seo title/description yechimning seo maydonlaridan; BreadcrumbList JSON-LD */
export function SolutionPage() {
  return (
    <>
      <Seo />
      <SolutionHero />
      <ProcessTimeline />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}

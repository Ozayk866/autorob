import { Seo } from "@/shared/seo";
import { FaqAccordion } from "@/widgets/site/faq-accordion";
import { CtaBand } from "@/widgets/site/cta-band";

/** TODO: FAQ sahifasi */
export function FaqPage() {
  return (
    <>
      <Seo />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}

import { Seo } from "@/shared/seo";
import { SolutionsGrid } from "@/widgets/site/solutions-grid";
import { CtaBand } from "@/widgets/site/cta-band";

/** TODO: yechimlar katalogi (?soha=) */
export function SolutionsPage() {
  return (
    <>
      <Seo />
      <SolutionsGrid />
      <CtaBand />
    </>
  );
}

import { Seo } from "@/shared/seo";
import { AboutTimeline } from "@/widgets/site/about-timeline";
import { StatsRow } from "@/widgets/site/stats-row";
import { TeamGrid } from "@/widgets/site/team-grid";
import { PartnersStrip } from "@/widgets/site/partners-strip";
import { CtaBand } from "@/widgets/site/cta-band";

/** TODO: biz haqimizda */
export function AboutPage() {
  return (
    <>
      <Seo />
      <AboutTimeline />
      <StatsRow />
      <TeamGrid />
      <PartnersStrip />
      <CtaBand />
    </>
  );
}

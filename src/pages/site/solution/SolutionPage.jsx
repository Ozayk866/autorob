import { useParams } from "react-router";
import { useSolution } from "@/entities/solution";
import { useLocale } from "@/shared/i18n";
import { Seo } from "@/shared/seo";
import { CtaBand } from "@/widgets/site/cta-band";
import { SolutionHero } from "./SolutionHero";
import { SolutionProblems } from "./SolutionProblems";
import { SolutionFeatures } from "./SolutionFeatures";
import { SolutionProcess } from "./SolutionProcess";
import { SolutionFaq } from "./SolutionFaq";
import { SolutionRelated } from "./SolutionRelated";
import "./SolutionPage.css";

// Yechim sahifasi — topshiriq: docs/tz/word/03_Yechim_sahifasi_CRM.docx
// Har bo'lim — alohida fayl (shu papkada). Stillar — SolutionPage.css, klasslar «solution-»

export function SolutionPage() {
  const { slug } = useParams(); // URL'dagi "crm-tizimi"
  const lang = useLocale();
  const { data: solution } = useSolution(slug, lang); // bitta yechim — bo'limlarga uzatiladi

  if (!solution) return null;

  return (
    <>
      <Seo />
      <SolutionHero solution={solution}  />
      <SolutionProblems />
      <SolutionFeatures features={solution.features} />
      <SolutionProcess />
      <SolutionFaq title={solution.title} faq={solution.faq} />
      <CtaBand solutionId={solution.id} />
      <SolutionRelated related={solution.related} />
    </>
  );
}

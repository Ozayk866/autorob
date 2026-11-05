import { useParams } from "react-router";
import { getSolution } from "@/data/solutions";
import { useLocale } from "@/i18n";
import { CtaBand } from "@/components";
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
  const solution = getSolution(slug); // bitta yechim — bo'limlarga uzatiladi

  if (!solution) return null;

  return (
    <>
      <SolutionHero solution={solution} />
      <SolutionProblems />
      <SolutionFeatures features={solution.features} />
      <SolutionProcess />
      <SolutionFaq title={solution.title} faq={solution.faq} />
      <CtaBand solutionId={solution.id} />
      <SolutionRelated related={solution.related} />
    </>
  );
}

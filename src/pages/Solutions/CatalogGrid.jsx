import { useSearchParams } from "react-router";
import { solutions as allSolutions } from "@/data/solutions";
import { useLocale, useT } from "@/i18n";

// Yechimlar kartalari (3 ustun): rasm, soha belgilari, nom, tavsif, «Batafsil →», «Narxini so'rash»
export function CatalogGrid() {
  const t = useT();
  const lang = useLocale();
  const [searchParams] = useSearchParams();
  const soha = searchParams.get("soha") ?? "";

  // ← shuni map qilasiz: solutions.map((solution) => …)
  //    solution.title, solution.shortDescription, solution.categories, solution.coverImage, solution.slug
  //    soha belgilari: solution.categories.map((c) => t("solutionCategories." + c)) → «Servis», «Ta'lim»
  const solutions = soha ? allSolutions.filter((s) => s.categories.includes(soha)) : allSolutions;

  return <div className="catalog-grid"></div>;
}

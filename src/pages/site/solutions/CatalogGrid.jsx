import { useSearchParams } from "react-router";
import { useSolutions } from "@/entities/solution";
import { useLocale } from "@/shared/i18n";

// Yechimlar kartalari (3 ustun): rasm, soha belgilari, nom, tavsif, «Batafsil →», «Narxini so'rash»
export function CatalogGrid() {
  const lang = useLocale();
  const [searchParams] = useSearchParams();
  const soha = searchParams.get("soha") ?? "";

  // ← shuni map qilasiz: solutions.map((solution) => …)
  //    solution.title, solution.shortDescription, solution.categories, solution.coverImage, solution.slug
  const { data: solutions = [] } = useSolutions(lang, soha ? { category: soha } : undefined);

  return <div className="catalog-grid"></div>;
}

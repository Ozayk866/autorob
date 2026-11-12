import { useSearchParams } from "react-router";
import { solutions as allSolutions, SOLUTION_CATEGORIES as CATALOG_CATEGORIES } from "@/data/solutions";
import { useLocale, useT } from "@/i18n";

// Filtr qatori: chapda «Hammasi · Servis · Ta'lim · Ishlab chiqarish» tugmalari, o'ngda «N ta yechim»
export function CatalogFilter() {
  const t = useT();
  const lang = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const soha = searchParams.get("soha") ?? ""; // tanlangan soha: "" (hammasi), "service", "education", "manufacturing"
  const solutions = soha ? allSolutions.filter((s) => s.categories.includes(soha)) : allSolutions; // «N ta yechim»: solutions.length

  // «Hammasi» tugmasi (ro'yxatda yo'q, birinchi bo'lib qo'lda yozasiz): bosilganda setSearchParams({}), tanlangan: soha === ""
  // ← shuni map qilasiz: CATALOG_CATEGORIES.map((value) => …) — value: "service", "education", "manufacturing"
  //    tugma matni: t("solutionCategories." + value) → «Servis»; bosilganda setSearchParams({ soha: value }); tanlangan: soha === value
const FILTERS = [
  { value: "", label: "Hammasi" },
  { value: "service", label: "Servis" },
  { value: "education", label: "Ta'lim" },
  { value: "manufacturing", label: "Ishlab chiqarish" },
];
 return<div className="catalog-filter">
  <div className="container">     
     {
      
      FILTERS.map((item) =>{
             
      return  <button className="soha" key={item.value}>
          {item.label}
        </button>
      })
      
    }
    </div>
  </div>;
}

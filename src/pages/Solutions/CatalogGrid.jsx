import { useSearchParams } from "react-router";
import { solutions as allSolutions } from "@/data/solutions";
import { useLocale, useT } from "@/i18n";
import { CoverArt } from "@/components";

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

  return <div className="catalog-grid">
    <div className="container">
      <div className="wrapper">
         {
        solutions.map((solution) =>{
        return <li className="bexa" key={solution.id}>
          <CoverArt className="img" icon={solution.coverImage}/>
          <h1 className="title">{solution.categories}</h1>
          <p className="info">{solution.shortDescription}</p>
          <a className="link" href={solution.slug}>Batafsil</a>
          <button type="submit"  className="btn">Narxini so'rash</button>
          
        </li>
        })
      }
      </div>
    
    </div>
  </div>;
}

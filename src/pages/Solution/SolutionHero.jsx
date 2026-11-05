import { useLeadModal } from "@/components";
import { HERO_STATS } from "./data";

// Hero (qorong'i fon): nom, tavsif, «Narxini so'rash», «Demo ko'rish», 3 ta raqam, o'ngda rasm
// solution.title, solution.shortDescription, solution.categories, solution.coverImage, solution.id
// ← shuni map qilasiz: HERO_STATS.map((stat) => …) — stat.value ("2–4 hafta"), stat.label (key={stat.label})
export function SolutionHero({ solution }) {
  const { open } = useLeadModal(); // «Narxini so'rash»: open(solution.id), «Demo ko'rish»: open(solution.id, { message: "Demo" })

  return (
    <section className="solution-hero">
      <h1>salom</h1>
    </section>
  );
}

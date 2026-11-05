import { SectionHeading } from "@/components";
import { PROBLEMS } from "./data";

// «Qaysi muammolarni hal qiladi» — 3 ta karta
// ← shuni map qilasiz: PROBLEMS.map((item) => …) — item.icon, item.title, item.text (key={item.title})
export function SolutionProblems() {
  return (
    <section className="solution-problems">
      <div className="container">
        {/* <SectionHeading eyebrow="Muammo" title="Qaysi muammolarni hal qiladi" /> */}
        {/* 3 ta karta */}
      </div>
    </section>
  );
}

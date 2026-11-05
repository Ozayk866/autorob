import { SectionHeading } from "@/components";
import { milestones } from "@/data/company";

// «Yo'limiz» (qorong'i fon): chiziqda yillar, har birida sarlavha va matn
export function AboutHistory() {
  // ← shuni map qilasiz: milestones.map((m) => …) — m.id, m.year, m.title, m.text

  return (
    <section className="about-history">
      <div className="container">
        <SectionHeading theme="dark" eyebrow="Tarix" title="Yo'limiz" />
        {/* yillar chizig'i */}
      </div>
    </section>
  );
}

import { SectionHeading } from "@/shared/ui";
import { useMilestones } from "@/entities/milestone";
import { useLocale } from "@/shared/i18n";

// «Yo'limiz» (qorong'i fon): chiziqda yillar, har birida sarlavha va matn
export function AboutHistory() {
  const lang = useLocale();
  const { data: milestones = [] } = useMilestones(lang); // ← shuni map qilasiz: m.year, m.title, m.text

  return (
    <section className="about-history">
      <div className="container">
        <SectionHeading theme="dark" eyebrow="Tarix" title="Yo'limiz" />
        {/* yillar chizig'i */}
      </div>
    </section>
  );
}

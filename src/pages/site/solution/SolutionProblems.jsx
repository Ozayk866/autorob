import { SectionHeading } from "@/shared/ui";

// «Qaysi muammolarni hal qiladi» — 3 ta karta
// Matnlar backend'dan kelmaydi: PROBLEMS ro'yxatini shu faylda yozasiz va ← shuni map qilasiz
export function SolutionProblems() {
  return (
    <section className="solution-problems">
      <div className="container">
        <SectionHeading eyebrow="Muammo" title="Qaysi muammolarni hal qiladi" />
        {/* 3 ta karta */}
      </div>
    </section>
  );
}

import { SectionHeading } from "@/shared/ui";

// «Qanday joriy qilamiz» — 4 bosqich: raqamli doira, nom, muddat, matn
// Matnlar backend'dan kelmaydi: PROCESS ro'yxatini shu faylda yozasiz va ← shuni map qilasiz
export function SolutionProcess() {
  return (
    <section className="solution-process">
      <div className="container">
        <SectionHeading eyebrow="Jarayon" title="Qanday joriy qilamiz" />
        {/* 4 bosqich */}
      </div>
    </section>
  );
}

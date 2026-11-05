import { SectionHeading } from "@/components";

// FAQ: chapda sarlavha (tayyor), o'ngda savollar (bosilganda javob ochiladi — useState)
// ← shuni map qilasiz: faq.map((item) => …) — item.id, item.question, item.answer
export function SolutionFaq({ title, faq }) {
  return (
    <section className="solution-faq">
      <div className="container">
        <SectionHeading
          eyebrow="FAQ"
          title={`${title} haqida savollar`}
          subtitle="Javob topmadingizmi? Ma'lumot qoldiring — tushuntirib beramiz."
        />
        {/* savollar */}
      </div>
    </section>
  );
}

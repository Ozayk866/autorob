import { SectionHeading } from "@/components";

// FAQ: chapda sarlavha (tayyor), o'ngda savollar (bosilganda javob ochiladi — useState)
// ← shuni map qilasiz: faq.map((item) => …) — item.id, item.question, item.answer
export function SolutionFaq({ title, faq }) {
  return (
    <section className="solution-faq">
      <div className="container">
        <div className="faq-wrapper">
        <SectionHeading className="faq-subtitle"
          eyebrow="FAQ"
          title={`${title} haqida savollar`}
          subtitle="Javob topmadingizmi? Ma'lumot qoldiring — tushuntirib beramiz."
        />
        <ul className="faq-list">
        {
          faq.map((item)=>{
            return <li className="faq-item" key={item.id}>
                <h4 className="faq-title">{item.question}</h4>
                <p className="faq-text">{item.answer}</p>

            </li>
          })
        }
        </ul>
        </div>
      </div>
    </section>
  );
}

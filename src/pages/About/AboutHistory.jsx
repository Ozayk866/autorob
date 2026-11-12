import { SectionHeading } from "@/components";
import { milestones } from "@/data/company";

// «Yo'limiz» (qorong'i fon): chiziqda yillar, har birida sarlavha va matn
export function AboutHistory() {
  // ← shuni map qilasiz: milestones.map((m) => …) — m.id, m.year, m.title, m.text

  return (
    <section className="about-history">
      <div className="container">
        <div className="wrapper1">
           <SectionHeading eyebrow="TARIX" title="Yo'limiz"/>
          <div className="timeline">
        <span className="timeline-line"></span>

  <div className="timeline-item">
    <div className="timeline-nuqta"></div>
    <span className="timeline-yil">2018</span>
    <h3>Kompaniya tashkil topdi</h3>
    <br />
    <p>Birinchi CRM loyihalar servis kompaniyalari uchun.</p>
  </div>

  <div className="timeline-item">
    <div className="timeline-nuqta"></div>
    <span className="timeline-yil">2020</span>
    <h3>ERP yo'nalishi</h3>
    <br />
    <p>Ombor va ishlab chiqarish hisobini avtomatlashtirish.</p>
  </div>

  <div className="timeline-item">
    <div className="timeline-nuqta"></div>
    <span className="timeline-yil">2022</span>
    <h3>Ta'lim yechimlari</h3>
    <br />
    <p>O'quv markazlari uchun maxsus CRM.</p>
  </div>

  <div className="timeline-item">
    <div className="timeline-nuqta"></div>
    <span className="timeline-yil">2024</span>
    <h3>Robotlashtirish</h3>
    <br />
    <p>Sanoat robotlarini yetkazib berish va o'rnatish.</p>
  </div>

  <div className="timeline-item">
    <div className="timeline-nuqta active"></div>
    <span className="timeline-yil">2026</span>
    <h3>Stanok liniyalari</h3>
    <br />
    <p>To'liq avtomatlashtirilgan liniyalar — kalit topshirish.</p>
  </div>
  <span className="timeline-end">* Yillar va voqealar — mock, mijozdan aniqlanadi</span>
</div>
        </div>
      </div>
    </section>
  );
}

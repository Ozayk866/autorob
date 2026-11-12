import { SectionHeading } from "@/components";

// «Bir tizimda — hamma narsa» — 6 ta karta: ikonka, nom, izoh
// ← shuni map qilasiz: features.map((name) => …) — features = ["Mijozlar bazasi", "Sotuv voronkasi", …]
export function SolutionFeatures({ features }) {
  return (
    <section className="solution-features">
      <div className="container">
        <SectionHeading className="features-subtitle"
          eyebrow="Imkoniyatlar"
          title="Bir tizimda — hamma narsa"
          subtitle="Kerakli modullarni tanlaysiz, qolganini keyin qo'shasiz."
        />
        <ul className="features-list">
        {
          features.map((item)=>{
            return <li className="features-item" key={item.name}>
              <h4 className="features-title">{item}</h4>
              <p className="features-text">Har bir mijoz tarixi: qo'ng'iroqlar, xabarlar,
buyurtmalar.</p>
            </li>
          })
        }
        </ul>
      </div>
    </section>
  );
}

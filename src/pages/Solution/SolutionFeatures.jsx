import { SectionHeading } from "@/components";

// «Bir tizimda — hamma narsa» — 6 ta karta: ikonka, nom, izoh
// ← shuni map qilasiz: features.map((name) => …) — features = ["Mijozlar bazasi", "Sotuv voronkasi", …]
export function SolutionFeatures({ features }) {
  return (
    <section className="solution-features">
      <div className="container">
        {/* <SectionHeading
          eyebrow="Imkoniyatlar"
          title="Bir tizimda — hamma narsa"
          subtitle="Kerakli modullarni tanlaysiz, qolganini keyin qo'shasiz."
        /> */}
        {/* 6 ta karta */}
      </div>
    </section>
  );
}

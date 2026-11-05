import { SectionHeading } from "@/components";
import { partners } from "@/data/company";

// «Sertifikatlar va hamkorlar» — 6 ta oq karta
export function AboutTrust() {
  // ← shuni map qilasiz: partners.map((partner) => …) — partner.id, partner.name, partner.logo

  return (
    <section className="about-trust">
      <div className="container">
        <SectionHeading eyebrow="Ishonch" title="Sertifikatlar va hamkorlar" />
        {/* 6 ta karta */}
      </div>
    </section>
  );
}

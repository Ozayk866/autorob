import { SectionHeading } from "@/shared/ui";
import { usePartners } from "@/entities/partner";
import { useLocale } from "@/shared/i18n";

// «Sertifikatlar va hamkorlar» — 6 ta oq karta
export function AboutTrust() {
  const lang = useLocale();
  const { data: partners = [] } = usePartners(lang); // ← shuni map qilasiz: partner.name, partner.logo

  return (
    <section className="about-trust">
      <div className="container">
        <SectionHeading eyebrow="Ishonch" title="Sertifikatlar va hamkorlar" />
        {/* 6 ta karta */}
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components";
import { partners } from "@/data/company";

// «Sertifikatlar va hamkorlar» — 6 ta oq karta
export function AboutTrust() {
  // ← shuni map qilasiz: partners.map((partner) => …) — partner.id, partner.name, partner.logo

  return (
    <section className="about-trust">
      <div className="container">
        <div className="wrapper2">
          <div className="hero2">
           <SectionHeading eyebrow="Ishonch" title="Sertifikatlar va hamkorlar" />
        </div>
       <ul className="about1">
       {partners.map((partner) => (
       <li className="item13" key={partner.id}>
       <h3 className="item12">{partner.name}</h3>
       <p className="item11">{partner.logo}</p>
       </li>
        ))}
        </ul>
        </div>
      </div>
    </section>
  );
}

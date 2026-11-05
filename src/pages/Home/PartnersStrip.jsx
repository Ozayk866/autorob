import { partners as allPartners } from "@/data/company";
import { useT } from "@/i18n";
import "./PartnersStrip.css";

/** «Bizga ishonch bildirgan kompaniyalar» — hamkorlar logotiplari. Ma'lumot — API (type: partner). */
export function PartnersStrip() {
  const t = useT();
  const partners = allPartners.filter((p) => p.type === "partner");

  return (
    <section className="partners-strip" aria-labelledby="partners-title">
      <div className="container">
        <h2 id="partners-title" className="partners-strip-caption">
          {t("home.partners.title")}
        </h2>
        <ul className="partners-strip-list">
          {partners.map((partner) => (
            <li key={partner.id}>
              <PartnerLogo partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PartnerLogo({ partner }) {
  const content = partner.logo ? (
    <img src={partner.logo} alt={partner.name} loading="lazy" className="partners-strip-logo" />
  ) : (
    <span className="partners-strip-name">{partner.name}</span>
  );

  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="partners-strip-card">
      {content}
    </a>
  ) : (
    <span className="partners-strip-card">{content}</span>
  );
}

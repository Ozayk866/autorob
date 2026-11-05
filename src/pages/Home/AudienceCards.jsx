import { Link } from "react-router";
import { routes, useLocale, useMessages, useT } from "@/i18n";
import { Icon, SectionHeading } from "@/components";
import "./AudienceCards.css";

/**
 * «Har bir soha uchun o'z yechimi» — 3 ta karta. Statik — lug'at: home.audience.
 * «Batafsil» → katalog shu soha filtri bilan (`category`: service | education | manufacturing).
 */
export function AudienceCards() {
  const t = useT();
  const lang = useLocale();
  const cards = useMessages("home.audience.cards", []);

  return (
    <section className="audience-cards">
      <div className="container">
        <SectionHeading eyebrow={t("home.audience.eyebrow")} title={t("home.audience.title")} />
        <ul className="audience-cards-grid">
          {cards.map((card) => (
            <li key={card.category} className="audience-cards-card">
              <span className="audience-cards-icon">
                <Icon name={card.icon} size={22} />
              </span>
              <h3 className="audience-cards-title">{card.title}</h3>
              <p className="audience-cards-text">{card.text}</p>
              <Link to={routes.solutions(lang, card.category)} className="audience-cards-more">
                {t("common.more")}
                <span className="visually-hidden">: {card.title}</span>
                <Icon name="arrow-right" size={18} className="audience-cards-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

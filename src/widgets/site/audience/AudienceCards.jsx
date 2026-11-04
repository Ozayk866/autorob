import { Link } from "react-router";
import { routes } from "@/shared/config";
import { useLocale, useMessages, useT } from "@/shared/i18n";
import { Icon, SectionHeading } from "@/shared/ui";
import styles from "./AudienceCards.module.css";

/**
 * «Har bir soha uchun o'z yechimi» — 3 ta karta. Statik — lug'at: home.audience.
 * «Batafsil» → katalog shu soha filtri bilan (`category`: service | education | manufacturing).
 */
export function AudienceCards() {
  const t = useT();
  const lang = useLocale();
  const cards = useMessages("home.audience.cards", []);

  return (
    <section className={styles.root}>
      <div className="container">
        <SectionHeading eyebrow={t("home.audience.eyebrow")} title={t("home.audience.title")} />
        <ul className={styles.grid}>
          {cards.map((card) => (
            <li key={card.category} className={styles.card}>
              <span className={styles.icon}>
                <Icon name={card.icon} size={22} />
              </span>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.text}>{card.text}</p>
              <Link to={routes.solutions(lang, card.category)} className={styles.more}>
                {t("common.more")}
                <span className="visually-hidden">: {card.title}</span>
                <Icon name="arrow-right" size={18} className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { usePartners } from "@/entities/partner";
import { useLocale, useT } from "@/shared/i18n";
import { Skeleton } from "@/shared/ui";
import styles from "./PartnersStrip.module.css";

/** «Bizga ishonch bildirgan kompaniyalar» — hamkorlar logotiplari. Ma'lumot — API (type: partner). */
export function PartnersStrip() {
  const t = useT();
  const lang = useLocale();
  const { data: partners, isPending, isError } = usePartners(lang, { type: "partner" });

  if (isError || (!isPending && !partners?.length)) return null;

  return (
    <section className={styles.root} aria-labelledby="partners-title">
      <div className="container">
        <h2 id="partners-title" className={styles.caption}>
          {t("home.partners.title")}
        </h2>
        <ul className={styles.list}>
          {isPending
            ? Array.from({ length: 6 }, (_, i) => (
                <li key={i}>
                  <Skeleton className={styles.skeleton} />
                </li>
              ))
            : partners.map((partner) => (
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
    <img
      src={partner.logo.url}
      alt={partner.name}
      width={partner.logo.width}
      height={partner.logo.height}
      loading="lazy"
      className={styles.logo}
    />
  ) : (
    <span className={styles.name}>{partner.name}</span>
  );

  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      {content}
    </a>
  ) : (
    <span className={styles.card}>{content}</span>
  );
}

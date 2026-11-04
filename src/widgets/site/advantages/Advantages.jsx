import { useLeadModal } from "@/features/lead-form";
import { useMessages, useT } from "@/shared/i18n";
import { Button, Icon, SectionHeading } from "@/shared/ui";
import styles from "./Advantages.module.css";

/** «Nega AUTOROB» — qorong'i blok: chapda matn + tugma, o'ngda 2×2 afzallik. Statik — lug'at: home.advantages. */
export function Advantages() {
  const t = useT();
  const { open } = useLeadModal();
  const items = useMessages("home.advantages.items", []);

  return (
    <section className={styles.root}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <SectionHeading
            theme="dark"
            eyebrow={t("home.advantages.eyebrow")}
            title={t("home.advantages.title")}
            subtitle={t("home.advantages.lead")}
          />
          <Button variant="light" size="lg" iconRight="arrow-right" onClick={() => open()}>
            {t("lead.cta")}
          </Button>
        </div>

        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.title} className={styles.item}>
              <Icon name="check-circle" size={22} className={styles.icon} />
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

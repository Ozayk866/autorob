import { Link } from "react-router";
import { localizePath, useLocale, useMessages, useT } from "@/shared/i18n";
import { Icon, SectionHeading } from "@/shared/ui";
import styles from "./SolutionsPath.module.css";

const pad = (n) => String(n).padStart(2, "0");

/**
 * «To'rt bosqich — bitta hamkor»: CRM → ERP → Robot → Stanok liniyasi. Statik — lug'at: home.path.
 * Har karta — yechim sahifasiga havola (`href` lug'atda).
 */
export function SolutionsPath() {
  const t = useT();
  const lang = useLocale();
  const steps = useMessages("home.path.steps", []);

  return (
    <section className={styles.root}>
      <div className="container">
        <SectionHeading
          eyebrow={t("home.path.eyebrow")}
          title={t("home.path.title")}
          subtitle={t("home.path.subtitle")}
        />
        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <li key={step.title}>
              <Link to={localizePath(step.href, lang)} className={styles.card}>
                <span className={styles.top}>
                  <span className={styles.icon}>
                    <Icon name={step.icon} size={22} />
                  </span>
                  <span className={styles.number}>{pad(i + 1)}</span>
                </span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

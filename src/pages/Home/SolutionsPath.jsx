import { Link } from "react-router";
import { localizePath, useLocale, useMessages, useT } from "@/i18n";
import { Icon, SectionHeading } from "@/components";
import "./SolutionsPath.css";

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
    <section className="solutions-path">
      <div className="container">
        <SectionHeading
          eyebrow={t("home.path.eyebrow")}
          title={t("home.path.title")}
          subtitle={t("home.path.subtitle")}
        />
        <ol className="solutions-path-steps">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Link to={localizePath(step.href, lang)} className="solutions-path-card">
                <span className="solutions-path-top">
                  <span className="solutions-path-icon">
                    <Icon name={step.icon} size={22} />
                  </span>
                  <span className="solutions-path-number">{pad(i + 1)}</span>
                </span>
                <h3 className="solutions-path-title">{step.title}</h3>
                <p className="solutions-path-text">{step.text}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

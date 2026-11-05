import { useLeadModal, Button, Icon, SectionHeading } from "@/components";
import { useMessages, useT } from "@/i18n";
import "./Advantages.css";

/** «Nega AUTOROB» — qorong'i blok: chapda matn + tugma, o'ngda 2×2 afzallik. Statik — lug'at: home.advantages. */
export function Advantages() {
  const t = useT();
  const { open } = useLeadModal();
  const items = useMessages("home.advantages.items", []);

  return (
    <section className="advantages">
      <div className="container advantages-layout">
        <div className="advantages-copy">
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

        <ul className="advantages-grid">
          {items.map((item) => (
            <li key={item.title} className="advantages-item">
              <Icon name="check-circle" size={22} className="advantages-icon" />
              <h3 className="advantages-title">{item.title}</h3>
              <p className="advantages-text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

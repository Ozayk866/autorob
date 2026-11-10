import { SECTIONS } from "./data";
import "./PrivacyPage.css";

// Maxfiylik siyosati — topshiriq: docs/tz/word/09_404_va_Maxfiylik_Islomjon.docx
// Klass nomlari «privacy-» bilan boshlanadi (PrivacyPage.css)

export function PrivacyPage() {
  return (
    <main className="privacy-domla">
      <h1 className="privacy-head">Maxfiylik siyosati</h1>

      <div className="privacy-list">
        {SECTIONS.map((s) => (
          <section className="privacy-hero" key={s.title}>
            <h2 className="privacy-title">{s.title}</h2>
            <p className="privacy-text">{s.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
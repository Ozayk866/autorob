import { useId } from "react";
import { contacts } from "@/data/contacts";
import { LeadForm } from "@/components/LeadForm/LeadForm";
import { useT } from "@/i18n";
import { Icon } from "@/components/Icon/Icon";
import "./CtaBand.css";

/**
 * Sahifa oxiridagi «Bepul konsultatsiya» bloki: chapda matn, o'ngda ariza formasi.
 * @param {{ solutionId?: string, showContacts?: boolean, showSolutionSelect?: boolean }} props
 * Bosh sahifada: showContacts + showSolutionSelect; boshqa sahifalarda — 2 maydonli forma.
 */
export function CtaBand({ solutionId, showContacts = false, showSolutionSelect = false }) {
  const t = useT();
  const titleId = useId();

  return (
    <section id="ariza" className="cta-band-section" aria-labelledby={titleId}>
      <div className="container">
        <div className="cta-band-box">
          <div className="cta-band-copy">
            <p className="cta-band-eyebrow">{t("cta.eyebrow")}</p>
            <h2 id={titleId} className="cta-band-title">
              {t("cta.title")}
            </h2>
            <p className="cta-band-lead">{t("cta.lead")}</p>
            {showContacts && (
              <ul className="cta-band-contacts">
                <li>
                  <a href={contacts.phoneHref} className="cta-band-contact">
                    <Icon name="phone" size={20} />
                    {contacts.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={contacts.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-band-contact"
                  >
                    <Icon name="send" size={20} />
                    {contacts.telegram}
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div className="cta-band-form-card">
            <LeadForm
              variant="inline"
              title={t("lead.title")}
              solutionId={solutionId}
              showSolutionSelect={showSolutionSelect}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

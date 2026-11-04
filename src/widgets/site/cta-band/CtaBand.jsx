import { useId } from "react";
import { useContacts } from "@/entities/settings";
import { LeadForm } from "@/features/lead-form";
import { useT } from "@/shared/i18n";
import { Icon } from "@/shared/ui";
import styles from "./CtaBand.module.css";

/**
 * Sahifa oxiridagi «Bepul konsultatsiya» bloki: chapda matn, o'ngda ariza formasi.
 * @param {{ solutionId?: string, showContacts?: boolean, showSolutionSelect?: boolean }} props
 * Bosh sahifada: showContacts + showSolutionSelect; boshqa sahifalarda — 2 maydonli forma.
 */
export function CtaBand({ solutionId, showContacts = false, showSolutionSelect = false }) {
  const t = useT();
  const contacts = useContacts();
  const titleId = useId();

  return (
    <section id="ariza" className={styles.section} aria-labelledby={titleId}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{t("cta.eyebrow")}</p>
            <h2 id={titleId} className={styles.title}>
              {t("cta.title")}
            </h2>
            <p className={styles.lead}>{t("cta.lead")}</p>
            {showContacts && (
              <ul className={styles.contacts}>
                <li>
                  <a href={contacts.phoneHref} className={styles.contact}>
                    <Icon name="phone" size={20} />
                    {contacts.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={contacts.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contact}
                  >
                    <Icon name="send" size={20} />
                    {contacts.telegram}
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div className={styles.formCard}>
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

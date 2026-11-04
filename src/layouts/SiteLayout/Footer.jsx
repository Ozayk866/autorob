import { Link } from "react-router";
import { useContacts } from "@/entities/settings";
import { useSolutions } from "@/entities/solution";
import { routes } from "@/shared/config";
import { useLocale, useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Logo } from "@/shared/ui";
import styles from "./Footer.module.css";

const COMPANY_LINKS = [
  { key: "nav.about", to: routes.about },
  { key: "nav.blog", to: routes.blog },
  { key: "nav.faq", to: routes.faq },
  { key: "nav.contacts", to: routes.contacts },
];

/** Figma: Footer (5:293) — brend | Yechimlar | Kompaniya | Aloqa, pastda © va maxfiylik */
export function Footer() {
  const lang = useLocale();
  const t = useT();
  const contacts = useContacts();
  // «Yechimlar» ustuni — admin paneldagi tartib bo'yicha birinchi 4 ta yechim
  const { data: solutions = [] } = useSolutions(lang);

  return (
    <footer className={styles.root}>
      <div className={cn("container", styles.top)}>
        <div className={styles.brand}>
          <Link to={routes.home(lang)} className={styles.logo} aria-label="AUTOROB">
            <Logo />
          </Link>
          <p className={styles.tagline}>{t("footer.tagline")}</p>
        </div>

        <FooterColumn title={t("footer.solutions")}>
          {solutions.slice(0, 4).map((solution) => (
            <Link key={solution.id} to={routes.solution(solution.slug, lang)} className={styles.link}>
              {solution.title}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.company")}>
          {COMPANY_LINKS.map((item) => (
            <Link key={item.key} to={item.to(lang)} className={styles.link}>
              {t(item.key)}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.contact")}>
          <a href={contacts.phoneHref} className={styles.link}>
            {contacts.phone}
          </a>
          <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {contacts.telegram}
          </a>
          <span className={styles.text}>{contacts.address}</span>
        </FooterColumn>
      </div>

      <div className={cn("container", styles.bottom)}>
        <div className={styles.bottomInner}>
          <p>
            © {new Date().getFullYear()} AUTOROB. {t("footer.rights")}
          </p>
          <Link to={routes.privacy(lang)} className={styles.link}>
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div className={styles.column}>
      <p className={styles.columnTitle}>{title}</p>
      {children}
    </div>
  );
}

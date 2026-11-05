import { Link } from "react-router";
import { contacts } from "@/data/contacts";
import { solutions } from "@/data/solutions";
import { routes, useLocale, useT } from "@/i18n";
import { Logo } from "@/components/Logo/Logo";
import "./Footer.css";

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

  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link to={routes.home(lang)} className="footer-logo" aria-label="AUTOROB">
            <Logo />
          </Link>
          <p className="footer-tagline">{t("footer.tagline")}</p>
        </div>

        <FooterColumn title={t("footer.solutions")}>
          {solutions.slice(0, 4).map((solution) => (
            <Link key={solution.id} to={routes.solution(solution.slug, lang)} className="footer-link">
              {solution.title}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.company")}>
          {COMPANY_LINKS.map((item) => (
            <Link key={item.key} to={item.to(lang)} className="footer-link">
              {t(item.key)}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.contact")}>
          <a href={contacts.phoneHref} className="footer-link">
            {contacts.phone}
          </a>
          <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="footer-link">
            {contacts.telegram}
          </a>
          <span className="footer-text">{contacts.address}</span>
        </FooterColumn>
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} AUTOROB. {t("footer.rights")}
          </p>
          <Link to={routes.privacy(lang)} className="footer-link">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div className="footer-column">
      <p className="footer-column-title">{title}</p>
      {children}
    </div>
  );
}

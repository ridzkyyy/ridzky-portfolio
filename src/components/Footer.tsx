import { EMAIL, GITHUB, LINKEDIN } from '../i18n/content';
import { useLang } from '../i18n/lang';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="end" id="contact">
      <div className="wrap contact reveal">
        <h2>{t.contact.title}</h2>
        <p>{t.contact.text}</p>
        <div className="actions">
          <a className="button button-light" href={`mailto:${EMAIL}`}>
            {t.contact.email}
          </a>
          <a className="mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </div>
      <div className="wrap footer-line">
        <span>{t.footer.copy}</span>
        <span className="footer-links">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://instagram.com/ridzkygn" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </span>
        <span>{t.footer.credit}</span>
      </div>
    </footer>
  );
}

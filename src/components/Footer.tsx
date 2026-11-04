import { EMAIL, LINKEDIN } from '../i18n/content';
import { useLang } from '../i18n/lang';

export function Footer() {
  const { t } = useLang();
  return (
    <>
      <section className="contact-band" id="contact" aria-labelledby="contact-heading">
        <div className="contact">
          <h2 id="contact-heading" className="contact-line">
            {t.contact.title}
          </h2>
          <div className="contact-links">
            <p>{t.contact.prompt}</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <span className="soft">{t.contact.where}</span>
          </div>
        </div>
      </section>
      <footer className="footer">
        <span className="soft">{t.footer.what}</span>
        <span className="footer-links">
          <a href="https://github.com/ridzkyyy" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://instagram.com/ridzkygn" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </span>
        <span className="soft">{t.footer.credit}</span>
      </footer>
    </>
  );
}

import { EMAIL, GITHUB, LINKEDIN } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { BenchFigure } from './bench/BenchFigure';
import { RouteField } from './RouteField';

export function Hero() {
  const { t, toggle } = useLang();
  return (
    <>
      <div className="bar-shell">
        <div className="bar wrap">
          <a className="wordmark" href="#top">
            Ridzky
          </a>
          <nav aria-label="Main">
            <a href="#work">{t.nav.work}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact">{t.nav.contact}</a>
            <button type="button" className="lang" onClick={toggle} aria-label={t.nav.switchTo} title={t.nav.switchTo}>
              {t.nav.switchShort}
            </button>
          </nav>
        </div>
      </div>
      <header className="top">
        <RouteField />
        <div className="hero wrap" id="top">
          <div className="hero-text">
            <h1>{t.hero.name}</h1>
            <p className="hero-role">{t.hero.role}</p>
            <p className="hero-intro">{t.hero.intro}</p>
            <div className="actions">
              <a className="button" href={`mailto:${EMAIL}`}>
                {t.hero.primary}
              </a>
              <a className="button button-quiet" href="#work">
                {t.hero.secondary}
              </a>
              <span className="hero-links">
                <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </span>
            </div>
          </div>
          <div className="hero-figure">
            <BenchFigure label={t.work.benchLabel} readout={t.work.benchReadout} />
          </div>
        </div>
      </header>
    </>
  );
}

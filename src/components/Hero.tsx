import { EMAIL } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { BenchFigure } from './bench/BenchFigure';

export function Hero() {
  const { t, toggle } = useLang();
  return (
    <header className="hero">
      <div className="topbar">
        <a className="wordmark" href="#top">
          Ridzky Guntur Nuriawan
        </a>
        <nav aria-label="Main">
          <a href="#systems">{t.nav.systems}</a>
          <a href="#products">{t.nav.products}</a>
          <a href="#about">{t.nav.about}</a>
          <button type="button" className="lang" onClick={toggle} aria-label={t.nav.lang}>
            {t.nav.langShort}
          </button>
          <a className="button" href={`mailto:${EMAIL}`}>
            {t.nav.email}
          </a>
        </nav>
      </div>
      <div className="hero-body" id="top">
        <h1>
          <span>{t.hero.title[0]}</span> <span>{t.hero.title[1]}</span>
        </h1>
        <div className="hero-text">
          <p>{t.hero.text}</p>
          <div className="actions">
            <a className="button" href={`mailto:${EMAIL}`}>
              {t.hero.primary}
            </a>
            <a className="text-link" href="#systems">
              {t.hero.secondary}
            </a>
          </div>
        </div>
        <BenchFigure label={t.hero.figureLabel} readout={t.hero.readout} caption={t.hero.caption} />
      </div>
    </header>
  );
}

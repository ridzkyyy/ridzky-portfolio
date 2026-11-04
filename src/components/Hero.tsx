import { useEffect, useState } from 'react';
import { EMAIL, GITHUB, LINKEDIN } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { BenchFigure } from './bench/BenchFigure';
import { RouteField } from './RouteField';

const CLOCK = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' });

/** Local time where I work, ticking once a second. */
function JakartaClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <time dateTime={now.toISOString()}>{CLOCK.format(now)}</time>;
}

export function Hero() {
  const { t, toggle } = useLang();
  const count = t.work.items.length + t.projects.items.length;
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
      <header className="top spot">
        <RouteField />
        <div className="hero wrap" id="top">
          <h1>{t.hero.name}</h1>
          <div className="hero-text">
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
          <dl className="readout" aria-label={t.hero.readout.label}>
            <div>
              <dt>{t.hero.readout.base}</dt>
              <dd>−6.2088, 106.8456</dd>
            </div>
            <div>
              <dt>{t.hero.readout.time}</dt>
              <dd>
                <JakartaClock /> UTC+7
              </dd>
            </div>
            <div>
              <dt>{t.hero.readout.count}</dt>
              <dd>{count}</dd>
            </div>
          </dl>
          <div className="hero-figure">
            <BenchFigure label={t.work.benchLabel} readout={t.work.benchReadout} />
          </div>
        </div>
      </header>
    </>
  );
}

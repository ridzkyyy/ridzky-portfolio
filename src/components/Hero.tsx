import { EMAIL, GITHUB, LINKEDIN } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { BenchFigure } from './bench/BenchFigure';
import { RouteField } from './RouteField';
import { JakartaClock } from './Clock';
import { TopBar } from './TopBar';

export function Hero() {
  const { t } = useLang();
  const count = t.work.items.length + t.projects.items.length;
  return (
    <>
      <TopBar />
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

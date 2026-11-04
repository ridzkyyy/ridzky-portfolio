import { EMAIL, GITHUB, LINKEDIN } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { BenchFigure } from './bench/BenchFigure';
import { RouteField } from './RouteField';
import { ShaderField } from './ShaderField';
import { caseHref } from '../routing/useHashRoute';

export function Hero() {
  const { t } = useLang();
  return (
    <>
      <header className="top spot">
        <ShaderField colors={['#bfe6e1', '#f7d4bc', '#d8d1f2']} background="#fbf8f3" focus={[0.7, 0.55]} />
        <RouteField />
        <div className="hero wrap" id="top">
          <h1 aria-label={`${t.hero.greeting.join(' ')} ${t.hero.name}`}>
            {t.hero.greeting[0]}{' '}
            <img className="avatar" src="/media/me-face.jpg" alt="" width={240} height={240} />{' '}
            {t.hero.greeting[1]}
          </h1>
          <div className="hero-text">
            <p className="hero-statement">
              {t.hero.statement[0]}
              <em>{t.hero.statement[1]}</em>
              {t.hero.statement[2]}
            </p>
            <p className="hero-intro">
              <strong>{t.hero.role}</strong> {t.hero.intro}
            </p>
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
          <div className="outcomes">
            <p className="outcomes-title">{t.hero.outcomesTitle}</p>
            <ol>
              {t.work.items
                .filter((item) => item.before)
                .map((item) => (
                  <li key={item.id}>
                    <a href={caseHref(item.id)}>
                      <b>
                        {item.outcome.value} <small>{item.outcome.unit}</small>
                      </b>
                      <span>{item.outcome.label}</span>
                      <em>{item.title}</em>
                    </a>
                  </li>
                ))}
            </ol>
            <p className="outcomes-note">{t.hero.estimate}</p>
          </div>
          <div className="hero-figure">
            <BenchFigure label={t.work.benchLabel} readout={t.work.benchReadout} />
          </div>
        </div>
      </header>
    </>
  );
}

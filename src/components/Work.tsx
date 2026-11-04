import type { CaseStudy } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { caseHref } from '../routing/useHashRoute';

/** One case on the home page: outcome and scale up front, the full story one click away. */
function CaseCard({ item, index }: { item: CaseStudy; index: number }) {
  const { t } = useLang();
  const shot = item.shots?.[0];
  return (
    <article className="case-card spot reveal" aria-labelledby={`card-${item.id}`}>
      <div className="case-card-copy">
        <p className="tag">
          {String(index + 1).padStart(2, '0')} · {item.tag}
        </p>
        <h3 id={`card-${item.id}`}>{item.title}</h3>
        <p className="case-card-summary">{item.summary}</p>
        <dl className="metrics">
          <div>
            <dt>
              {item.outcome.value} <small>{item.outcome.unit}</small>
            </dt>
            <dd>{item.outcome.label}</dd>
          </div>
          <div>
            <dt>{item.scale.value}</dt>
            <dd>{item.scale.label}</dd>
          </div>
        </dl>
        <ul className="chips" aria-label={t.work.stack}>
          {item.stack.slice(0, 4).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <a className="button" href={caseHref(item.id)}>
          {t.work.view} <span aria-hidden="true">→</span>
        </a>
      </div>
      {shot ? (
        <a className="case-card-shot" href={caseHref(item.id)} tabIndex={-1} aria-hidden="true">
          <img src={shot.src} alt="" loading="lazy" width={1100} height={640} />
          {shot.blurred ? <span className="privacy">{t.work.blurred}</span> : null}
        </a>
      ) : null}
    </article>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <section className="section wrap" id="work" aria-labelledby="work-heading">
      <div className="work-head reveal">
        <h2 id="work-heading">{t.work.title}</h2>
        <p>{t.work.lede}</p>
      </div>
      <div className="case-cards">
        {t.work.items.map((item, i) => (
          <CaseCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

import { useState } from 'react';
import type { CaseStudy } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { caseHref } from '../routing/useHashRoute';
import { Flow } from './flow/Flow';
import './flow/flow.css';

function Stages({ item }: { item: CaseStudy }) {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  if (!item.stages) return null;
  const stage = item.stages[open];
  return (
    <section className="cs-block reveal" aria-labelledby="cs-approach">
      <h2 id="cs-approach">{t.work.approach}</h2>
      <div className="stages">
        <div className="segmented" role="group" aria-label={t.work.stageHint}>
          {item.stages.map((s, i) => (
            <button key={s.name} type="button" aria-pressed={i === open} onClick={() => setOpen(i)}>
              {s.name}
            </button>
          ))}
        </div>
        <Flow key={stage.name} title={stage.name} steps={stage.steps} />
      </div>
    </section>
  );
}

function Shot({ src, alt, blurred, label }: { src: string; alt: string; blurred?: boolean; label: string }) {
  return (
    <figure className="cs-shot reveal">
      <img src={src} alt={alt} width={1100} height={640} />
      {blurred ? <span className="privacy">{label}</span> : null}
    </figure>
  );
}

/** The full story of one case: problem, what changed, how it works, and what I did. */
export function CasePage({ id }: { id: string }) {
  const { t } = useLang();
  const items = t.work.items;
  const index = items.findIndex((item) => item.id === id);
  const item = items[index];
  if (!item) {
    return (
      <main className="wrap cs">
        <a className="cs-back" href="#work">
          ← {t.work.back}
        </a>
      </main>
    );
  }
  const next = items[(index + 1) % items.length];
  const [first, ...rest] = item.shots ?? [];
  return (
    <main className="cs" aria-labelledby="cs-title">
      <header className="wrap cs-head">
        <a className="cs-back" href="#work">
          ← {t.work.back}
        </a>
        <p className="tag">{item.tag}</p>
        <h1 id="cs-title">{item.title}</h1>
        <p className="cs-lead">{item.summary}</p>
        <dl className="metrics metrics-large">
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
      </header>
      <div className="wrap">
        {first ? <Shot {...first} label={t.work.blurred} /> : null}
        {item.before && item.after ? (
          <div className="cs-shift reveal">
            <section aria-labelledby="cs-problem">
              <h2 id="cs-problem">{t.work.problem}</h2>
              <p>{item.before}</p>
            </section>
            <section aria-labelledby="cs-result">
              <h2 id="cs-result">{t.work.result}</h2>
              <p>{item.after}</p>
            </section>
          </div>
        ) : null}
        <section className="cs-block reveal" aria-labelledby="cs-did">
          <h2 id="cs-did">{t.work.did}</h2>
          <ol className="cs-points">
            {item.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
          <ul className="chips" aria-label={t.work.stack}>
            {item.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {item.links.length > 0 ? (
            <div className="actions">
              {item.links.map((l, i) => (
                <a key={l.href} className={i === 0 ? 'button' : 'text-link'} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          ) : (
            <p className="muted">{t.work.private}</p>
          )}
        </section>
        <Stages item={item} />
        {rest.map((shot) => (
          <Shot key={shot.src} {...shot} label={t.work.blurred} />
        ))}
        <a className="cs-next spot" href={caseHref(next.id)}>
          <span>{t.work.next}</span>
          <b>{next.title} →</b>
          <small>
            {next.outcome.value} {next.outcome.unit}
          </small>
        </a>
      </div>
    </main>
  );
}

import { useState } from 'react';
import type { CaseStudy } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { BenchFigure } from './bench/BenchFigure';
import { Flow } from './flow/Flow';
import './flow/flow.css';

function Media({ item }: { item: CaseStudy }) {
  const { t } = useLang();
  if (item.shots?.length) {
    return (
      <div className="case-media">
        {item.shots.map((shot, i) => (
          <img key={shot.src} className={i > 0 ? 'case-shot-second' : undefined} src={shot.src} alt={shot.alt} loading="lazy" width={1200} height={750} />
        ))}
      </div>
    );
  }
  return (
    <div className="case-media case-media-figure">
      <BenchFigure label={t.work.benchLabel} readout={t.work.benchReadout} />
    </div>
  );
}

function Stages({ item }: { item: CaseStudy }) {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  if (!item.stages) return null;
  const stage = item.stages[open];
  return (
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
  );
}

function Case({ item }: { item: CaseStudy }) {
  const { t } = useLang();
  return (
    <article className="case" aria-labelledby={`case-${item.id}`}>
      <Media item={item} />
      <div className="case-copy">
        <p className="tag">{item.tag}</p>
        <h3 id={`case-${item.id}`}>{item.title}</h3>
        <p className="case-summary">{item.summary}</p>
        <ul className="points">
          {item.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <ul className="chips" aria-label="Stack">
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
      </div>
      <Stages item={item} />
    </article>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <section className="section wrap" id="work" aria-labelledby="work-heading">
      <h2 id="work-heading">{t.work.title}</h2>
      <div className="cases">
        {t.work.items.map((item) => (
          <Case key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

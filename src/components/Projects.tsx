import { useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import type { Project, ProjectGroup } from '../i18n/content';
import { useLang } from '../i18n/lang';

type Filter = 'all' | ProjectGroup;
const FILTERS: Filter[] = ['all', 'fleet', 'ai', 'platform', 'web'];

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** Column spans on a 12-column grid: screens pair up 7+5 then 5+7, text tiles go three to a row, leftovers stretch. */
function spans(items: Project[]): number[] {
  const shots = items.filter((p) => p.image).length;
  const texts = items.length - shots;
  let s = 0;
  let x = 0;
  return items.map((p) => {
    if (p.image) {
      const i = s++;
      if (i === shots - 1 && shots % 2 === 1) return 12;
      return (i % 4 === 0 || i % 4 === 3) ? 7 : 5;
    }
    const i = x++;
    const tail = texts % 3;
    if (tail && i >= texts - tail) return 12 / tail;
    return 4;
  });
}

/** Tiles morph between filters where the browser supports view transitions; elsewhere they just swap. */
function morph(update: () => void) {
  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return update();
  document.startViewTransition(() => flushSync(update));
}

function Tile({ p, index, span, blurred }: { p: Project; index: number; span: number; blurred: string }) {
  const style = { viewTransitionName: `p-${slug(p.name)}`, '--span': span } as CSSProperties;
  return (
    <li className={p.image ? 'tile spot has-image' : 'tile spot'} style={style}>
      {p.image ? (
        <div className="tile-shot">
          <img src={p.image.src} alt={p.image.alt} loading="lazy" width={1100} height={700} />
          {p.image.blurred ? <span className="privacy">{blurred}</span> : null}
        </div>
      ) : null}
      <div className="tile-copy">
        <span className="tile-index">{String(index + 1).padStart(2, '0')}</span>
        <h3>{p.name}</h3>
        <p className="tag">{p.kind}</p>
        <p className="tile-what">{p.what}</p>
      </div>
    </li>
  );
}

export function Projects() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const all = t.projects.items;
  const shown = filter === 'all' ? all : all.filter((p) => p.group === filter);
  const widths = spans(shown);
  return (
    <section className="gallery" id="projects" aria-labelledby="projects-heading">
      <div className="wrap">
        <div className="gallery-head reveal">
          <h2 id="projects-heading">
            {t.projects.title} <span className="count">{all.length}</span>
          </h2>
          <div className="filters" role="group" aria-label={t.projects.title}>
            {FILTERS.map((f) => (
              <button key={f} type="button" aria-pressed={f === filter} onClick={() => morph(() => setFilter(f))}>
                {t.projects.filters[f]}
                <span>{f === 'all' ? all.length : all.filter((p) => p.group === f).length}</span>
              </button>
            ))}
          </div>
        </div>
        <ul className="bento">
          {shown.map((p, i) => (
            <Tile key={p.name} p={p} index={all.indexOf(p)} span={widths[i]} blurred={t.work.blurred} />
          ))}
        </ul>
      </div>
    </section>
  );
}

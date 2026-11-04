import { useRef, useState, type KeyboardEvent } from 'react';
import { EMAIL } from '../i18n/content';
import { useLang } from '../i18n/lang';
import './products.css';

const ID = 'product';

export function Products() {
  const { t } = useLang();
  const items = t.products.items;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const product = items[active];

  const onTabKey = (event: KeyboardEvent) => {
    const step: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    // Move from the focused tab, which hover-to-preview may have left behind.
    const tabs = [...(tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])];
    const from = Math.max(0, tabs.indexOf(document.activeElement as HTMLButtonElement));
    let next: number | null = null;
    if (event.key in step) next = (from + step[event.key] + items.length) % items.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = items.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs[next]?.focus();
  };

  return (
    <section className="section" id="products" aria-labelledby="products-heading">
      <div className="column">
        <h2 id="products-heading">{t.products.title}</h2>
        <p className="lead">{t.products.lead}</p>
      </div>

      <div className="shipped">
        <div className="shipped-list" role="tablist" aria-label={t.nav.products} aria-orientation="vertical" ref={tabsRef} onKeyDown={onTabKey}>
          {items.map((p, i) => (
            <button
              key={p.name}
              type="button"
              role="tab"
              id={`${ID}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${ID}-panel`}
              tabIndex={i === active ? 0 : -1}
              className="shipped-row"
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
            >
              <span className="shipped-name">{p.name}</span>
              <span className="shipped-kind">{p.kind.split(', ')[0]}</span>
            </button>
          ))}
        </div>

        <article className="shipped-panel" role="tabpanel" id={`${ID}-panel`} aria-labelledby={`${ID}-tab-${active}`} key={product.name}>
          {product.media ? (
            <img className="shipped-shot" src={product.media.src} alt={product.media.alt} width={960} height={600} />
          ) : (
            <div className="shipped-brief">
              <p>{product.brief}</p>
            </div>
          )}
          <div className="shipped-copy">
            <h3>{product.name}</h3>
            <p className="soft">{product.kind}</p>
            <p>{product.desc}</p>
            <p className="stack-line">
              {t.products.built} {product.stack.join(', ')}.
            </p>
            {product.links.length > 0 ? (
              <div className="actions">
                {product.links.map((l) => (
                  <a key={l.href} className="text-link" href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                ))}
              </div>
            ) : (
              <a className="text-link" href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${t.products.walkthroughSubject}: ${product.name}`)}`}>
                {t.products.walkthrough}
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

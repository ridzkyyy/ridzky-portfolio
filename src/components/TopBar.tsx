import { useEffect, useState } from 'react';
import { EMAIL } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { JakartaClock } from './Clock';

const SECTIONS = ['work', 'projects', 'about', 'contact'] as const;
type Section = (typeof SECTIONS)[number];

/** The section whose top has passed the middle of the screen is the one being read. */
function useActiveSection() {
  const [active, setActive] = useState<Section | null>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target.id as Section);
        if (seen.length) setActive(seen[seen.length - 1]);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" />
      <path d="M8 22c3-8 6 0 9-6s5-6 7-6" />
      <circle cx="24" cy="10" r="2.6" />
    </svg>
  );
}

export function TopBar() {
  const { t, toggle } = useLang();
  const active = useActiveSection();
  return (
    <div className="bar-shell">
      <div className="bar wrap">
        <a className="brand" href="#top">
          <Mark />
          <span className="brand-text">
            <b>Ridzky Guntur</b>
            <small>{t.nav.tagline}</small>
          </span>
        </a>
        <span className="status">
          <i aria-hidden="true" />
          {t.nav.status} · <JakartaClock /> WIB
        </span>
        <nav aria-label="Main">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className="bar-actions">
          <button type="button" className="lang" onClick={toggle} aria-label={t.nav.switchTo} title={t.nav.switchTo}>
            {t.nav.switchShort}
          </button>
          <a className="button button-small" href={`mailto:${EMAIL}`}>
            {t.nav.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

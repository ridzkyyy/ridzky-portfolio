import { useEffect, useState } from 'react';
import { EMAIL } from '../i18n/content';
import { useLang } from '../i18n/lang';
import { JakartaClock } from './Clock';
import { useHashRoute } from '../routing/useHashRoute';

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

export function TopBar() {
  const { t, lang, toggle } = useLang();
  const { caseId } = useHashRoute();
  const seen = useActiveSection();
  // A case page belongs to Work, whatever section the observer last saw.
  const active = caseId ? 'work' : seen;
  return (
    <div className="bar-shell">
      <div className="bar wrap">
        <a className="brand" href="#top">
          Ridzky Guntur Nuriawan
        </a>
        <nav aria-label="Main">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className="bar-end">
          <span className="bar-time">
            Jakarta <JakartaClock />
          </span>
          <button type="button" className="lang" onClick={toggle} aria-label={t.nav.switchTo} title={t.nav.switchTo}>
            <span aria-current={lang === 'en' ? 'true' : undefined}>EN</span> / <span aria-current={lang === 'id' ? 'true' : undefined}>ID</span>
          </button>
          <a className="bar-mail" href={`mailto:${EMAIL}`}>
            {t.nav.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

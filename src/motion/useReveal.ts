import { useEffect } from 'react';

const TARGETS = '.reveal';
const STAGGER_MS = 80;

/** Marked parts rise in as they enter. Content is visible without script or under reduced motion. */
export function useReveal(dependency: unknown) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = [...document.querySelectorAll<HTMLElement>(TARGETS)].filter((el) => !el.classList.contains('in'));
    document.documentElement.classList.add('motion');
    items.forEach((el) => {
      const group = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal')) : [el];
      el.style.setProperty('--reveal-delay', `${Math.min(group.indexOf(el), 5) * STAGGER_MS}ms`);
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dependency]);
}

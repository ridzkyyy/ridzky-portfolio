import { useEffect } from 'react';

/** One pointer listener lights whichever `.spot` surface is under the cursor, through --x and --y. */
export function useSpotlight() {
  useEffect(() => {
    if (!matchMedia('(hover: hover)').matches) return;
    const move = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('.spot');
      if (!el) return;
      const box = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - box.left}px`);
      el.style.setProperty('--y', `${e.clientY - box.top}px`);
    };
    document.addEventListener('pointermove', move, { passive: true });
    return () => document.removeEventListener('pointermove', move);
  }, []);
}

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { buildIntro } from './intro';
import { initScroll } from './scroll';
import { initPointer } from './pointer';

gsap.registerPlugin(ScrollTrigger);

/** Smooth-scrolls in-page anchors through Lenis so ScrollTrigger stays in sync. */
function anchorHandler(lenis: Lenis): (e: MouseEvent) => void {
  return (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const target = document.querySelector<HTMLElement>(a.getAttribute('href') ?? '');
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.2 });
  };
}

/** Orchestrates the whole motion system. Reduced-motion users get a static,
 *  fully-visible page with native scrolling. */
export function useMotion(): void {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOk: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
        finePointer: '(hover: hover) and (pointer: fine)',
      },
      (ctx) => {
        const { motionOk, finePointer } = ctx.conditions ?? {};

        if (!motionOk) {
          const pre = document.querySelector<HTMLElement>('.preloader');
          if (pre) gsap.set(pre, { display: 'none' });
          return undefined;
        }

        const lenis = new Lenis({ lerp: 0.11 });
        lenis.on('scroll', ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        const onAnchor = anchorHandler(lenis);
        document.addEventListener('click', onAnchor);

        buildIntro();
        initScroll();
        const cleanPointer = finePointer ? initPointer() : undefined;

        return () => {
          document.removeEventListener('click', onAnchor);
          cleanPointer?.();
          gsap.ticker.remove(raf);
          lenis.destroy();
        };
      },
    );

    return () => mm.revert();
  }, []);
}

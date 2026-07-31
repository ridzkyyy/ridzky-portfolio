import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from './split';

function heroParallax(): void {
  const st = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } as const;
  gsap.to('.hero-map', { yPercent: 24, scale: 1.06, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-body', { yPercent: -12, opacity: 0.15, ease: 'none', scrollTrigger: st });
}

function progressBar(): void {
  gsap.to('.progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });
}

function sectionHeads(): void {
  document.querySelectorAll<HTMLElement>('.section-head').forEach((head) => {
    const h2 = head.querySelector<HTMLElement>('h2');
    const words = h2 ? splitWords(h2) : [];
    const sub = head.querySelector('.sub');
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      scrollTrigger: { trigger: head, start: 'top 82%' },
    });
    tl.from(head.querySelector('.num'), { x: -18, autoAlpha: 0, duration: 0.55 });
    if (words.length) tl.from(words, { yPercent: 112, duration: 0.9, stagger: 0.06 }, 0.1);
    if (sub) tl.from(sub, { y: 16, autoAlpha: 0, duration: 0.7 }, '-=0.55');
  });
}

function metrics(): void {
  const blocks = gsap.utils.toArray<HTMLElement>('.metric');
  if (!blocks.length) return;

  gsap.from(blocks, {
    y: 36,
    autoAlpha: 0,
    duration: 0.85,
    stagger: 0.09,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.metrics', start: 'top 85%' },
  });

  blocks.forEach((block) => {
    const b = block.querySelector<HTMLElement>('b');
    if (!b) return;
    const raw = b.textContent ?? '';
    const m = raw.match(/(\d+(?:\.\d+)?)/);
    if (!m) return;
    const target = parseFloat(m[1]);
    const proxy = { n: 0 };
    gsap.to(proxy, {
      n: target,
      duration: 1.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: block, start: 'top 88%' },
      onUpdate: () => {
        b.textContent = raw.replace(m[1], String(Math.round(proxy.n)));
      },
    });
  });
}

function featuredSystems(): void {
  document.querySelectorAll<HTMLElement>('.featured-system').forEach((card) => {
    const path = card.querySelector<SVGPathElement>('.pipe-path');
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      scrollTrigger: { trigger: card, start: 'top 78%' },
    });

    tl.from(card, { y: 56, autoAlpha: 0, duration: 1 });
    tl.from(card.querySelectorAll('.sys-head, .desc'), { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.15);

    if (path) {
      const len = path.getTotalLength();
      tl.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0.35);
    }
    tl.from(card.querySelectorAll('.pipe-node'), { scale: 0, transformOrigin: 'center', duration: 0.5, stagger: 0.07, ease: 'back.out(2.8)' }, 0.6)
      .from(card.querySelectorAll('.pipe-labels > div'), { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.7)
      .from(card.querySelectorAll('.pipe-dash, .pipe-pulse'), { autoAlpha: 0, duration: 0.6 }, 1.3)
      .from(card.querySelectorAll('.sys-tags li'), { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.04 }, 0.9);
  });
}

function atlasGrid(): void {
  const minis = gsap.utils.toArray<HTMLElement>('.mini-system');
  if (!minis.length) return;
  gsap.set(minis, { y: 40, autoAlpha: 0 });
  ScrollTrigger.batch(minis, {
    start: 'top 88%',
    onEnter: (els) =>
      gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.09, ease: 'expo.out', overwrite: true }),
  });
}

function cards(): void {
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    const shot = card.querySelector<HTMLElement>('.shot');
    const img = shot?.querySelector('img');
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      scrollTrigger: { trigger: card, start: 'top 82%' },
    });
    tl.from(card, { y: 48, autoAlpha: 0, duration: 0.9 });
    if (shot) tl.from(shot, { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'expo.inOut' }, 0.15);
    if (img) tl.from(img, { scale: 1.3, duration: 1.5 }, 0.15);
    tl.from(card.querySelectorAll('.card-body > *'), { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.07 }, '-=1.0');
  });
}

function about(): void {
  const big = document.querySelector<HTMLElement>('.about-grid .big');
  if (big) {
    const words = splitWords(big);
    gsap.fromTo(
      words,
      { opacity: 0.13 },
      {
        opacity: 1,
        stagger: 0.4,
        duration: 0.8,
        ease: 'none',
        scrollTrigger: { trigger: big, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  }
  gsap.from('.fact-list li', {
    x: -26,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.fact-list', start: 'top 85%' },
  });
}

function footer(): void {
  const cta = document.querySelector<HTMLElement>('.footer .cta-title');
  const words = cta ? splitWords(cta) : [];
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    scrollTrigger: { trigger: '.footer', start: 'top 78%' },
  });
  if (words.length) tl.from(words, { yPercent: 112, duration: 0.9, stagger: 0.045 });
  tl.from('.footer .mail', { y: 22, scale: 0.92, autoAlpha: 0, duration: 0.8 }, '-=0.4')
    .from('.footer-meta > *', { y: 12, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, '-=0.45');
}

export function initScroll(): void {
  heroParallax();
  progressBar();
  sectionHeads();
  metrics();
  featuredSystems();
  atlasGrid();
  cards();
  about();
  footer();
}

import gsap from 'gsap';

const SEEN_KEY = 'rgn-booted';
const SCRAMBLE_CHARS = '█▓▒░<>/:·01';

/** Terminal-style scramble that converges on the element's real text. */
function scramble(el: HTMLElement, duration: number): gsap.core.Tween {
  const finalText = el.dataset.text ?? el.textContent ?? '';
  const proxy = { p: 0 };
  return gsap.to(proxy, {
    p: 1,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      const settled = Math.floor(proxy.p * finalText.length);
      let out = finalText.slice(0, settled);
      for (let i = settled; i < finalText.length; i += 1) {
        out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;
    },
  });
}

function setHeroInitialState(): void {
  gsap.set('.hero .line', { yPercent: 112 });
  gsap.set('.hero-top nav a', { y: -16, autoAlpha: 0 });
  gsap.set('.status-chips .chip', { y: 14, autoAlpha: 0 });
  gsap.set('.hero .lede, .hero-cta .btn', { y: 26, autoAlpha: 0 });
  gsap.set('.hero-foot span', { y: 12, autoAlpha: 0 });
  gsap.set('.hero-map .map-grid', { autoAlpha: 0 });
  gsap.set('.hero-map .geo, .hero-map .wp', { autoAlpha: 0, scale: 0.4, transformOrigin: 'center' });
  gsap.set('.hero-map .hero-pulse', { autoAlpha: 0 });

  const route = document.querySelector<SVGPathElement>('.hero-map .route-draw');
  if (route) {
    const len = route.getTotalLength();
    gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
  }
}

function heroTimeline(): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  const route = document.querySelector<SVGPathElement>('.hero-map .route-draw');
  const brand = document.querySelector<HTMLElement>('.hero-top .brand');

  tl.to('.hero .line', { yPercent: 0, duration: 1.15, stagger: 0.14 })
    .to('.status-chips .chip', { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07 }, 0.25)
    .to('.hero .lede', { y: 0, autoAlpha: 1, duration: 0.9 }, 0.55)
    .to('.hero-cta .btn', { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 }, 0.7)
    .to('.hero-top nav a', { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05 }, 0.5)
    .to('.hero-foot span', { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, 1.0)
    .to('.hero-map .map-grid', { autoAlpha: 1, duration: 1.4, ease: 'power1.out' }, 0.3);

  if (brand) tl.add(scramble(brand, 0.9), 0.15);

  if (route) {
    tl.to(route, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.5)
      .to('.hero-map .wp', { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2.5)' }, 1.1)
      .to('.hero-map .geo', { autoAlpha: 1, scale: 1, duration: 0.8 }, 1.5)
      .to('.hero-map .hero-pulse', { autoAlpha: 1, duration: 0.6 }, 2.1);
  }

  return tl;
}

/** Boot preloader (first visit per session) chained into the hero entrance. */
export function buildIntro(): void {
  const pre = document.querySelector<HTMLElement>('.preloader');
  const seen = sessionStorage.getItem(SEEN_KEY) === '1';

  setHeroInitialState();

  if (!pre || seen) {
    if (pre) gsap.set(pre, { display: 'none' });
    heroTimeline().delay(0.15);
    return;
  }

  const count = pre.querySelector<HTMLElement>('.pre-count');
  const bar = pre.querySelector<HTMLElement>('.pre-bar i');
  const label = pre.querySelector<HTMLElement>('.pre-label');
  const proxy = { n: 0 };

  const tl = gsap.timeline({
    onComplete: () => {
      sessionStorage.setItem(SEEN_KEY, '1');
      gsap.set(pre, { display: 'none' });
    },
  });

  if (label) tl.add(scramble(label, 0.6), 0);
  tl.to(proxy, {
    n: 100,
    duration: 1.1,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (count) count.textContent = String(Math.round(proxy.n)).padStart(3, '0');
    },
  }, 0);
  if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0);

  tl.to('.pre-inner', { autoAlpha: 0, y: -18, duration: 0.35, ease: 'power2.in' }, '+=0.1')
    .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.75, ease: 'expo.inOut' }, '-=0.1')
    .add(heroTimeline(), '-=0.45');
}

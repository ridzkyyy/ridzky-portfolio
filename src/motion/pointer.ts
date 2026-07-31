import gsap from 'gsap';

const MAGNET_STRENGTH = 0.32;
const TILT_DEG = 5;
const PERSPECTIVE = 900;

type Cleanup = () => void;

/** Cursor-tracked spotlight: writes --mx/--my consumed by .spot::after in CSS. */
function spotlight(): Cleanup {
  const els = document.querySelectorAll<HTMLElement>('.card, .mini-system, .featured-system, .metric');
  const cleanups: Cleanup[] = [];
  els.forEach((el) => {
    el.classList.add('spot');
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointermove', onMove);
    cleanups.push(() => {
      el.removeEventListener('pointermove', onMove);
      el.classList.remove('spot');
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/** Buttons lean toward the cursor and spring back on leave. */
function magnetic(): Cleanup {
  const els = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  const cleanups: Cleanup[] = [];
  els.forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * MAGNET_STRENGTH);
      yTo((e.clientY - (r.top + r.height / 2)) * MAGNET_STRENGTH);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/** Subtle 3D tilt on project cards — rotation only, so it composes with scroll tweens. */
function tilt(): Cleanup {
  const els = document.querySelectorAll<HTMLElement>('.card');
  const cleanups: Cleanup[] = [];
  els.forEach((el) => {
    gsap.set(el, { transformPerspective: PERSPECTIVE });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.55, ease: 'power2' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.55, ease: 'power2' });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * TILT_DEG);
      rx(-py * TILT_DEG);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

export function initPointer(): Cleanup {
  const cleanups = [spotlight(), magnetic(), tilt()];
  return () => cleanups.forEach((fn) => fn());
}

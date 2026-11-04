// Shared plumbing for Anatomy figures: safe mounting and an in-view frame loop.

// Markup must come from our own geometry modules; it is parsed as SVG, never as HTML.
export function mountSvg(stage: HTMLElement, source: string): SVGSVGElement {
  const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
  const svg = document.importNode(doc.documentElement, true) as unknown as SVGSVGElement;
  stage.replaceChildren(svg);
  return svg;
}

export const svgSource = (width: number, height: number, label: string, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">${body}</svg>`;

export const prefersStill = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Runs `tick(dt, calm)` each frame while the stage is on screen and `tick` returns true. */
export function frameLoop(stage: HTMLElement, tick: (dt: number, calm: boolean) => boolean) {
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let last = 0;
  let visible = false;
  const step = (now: number) => {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    frame = tick(dt, still.matches) && visible ? requestAnimationFrame(step) : 0;
  };
  const kick = () => {
    if (!frame && visible) {
      last = 0;
      frame = requestAnimationFrame(step);
    }
  };
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      kick();
    },
    { rootMargin: '120px 0px' },
  );
  io.observe(stage);
  return {
    kick,
    stop: () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    },
  };
}

export const follow = (value: number, goal: number, dt: number, seconds: number, calm: boolean) => {
  if (calm) return goal;
  const next = value + (goal - value) * (1 - Math.exp(-dt / seconds));
  return Math.abs(goal - next) < 0.02 ? goal : next;
};

// Camera control for figures drawn from a 3D world model: drag or arrow keys turn it,
// and an idle sway shows it can turn. Ranges keep the same faces visible, so painter's order holds.
import { follow } from './runtime';

export interface OrbitOptions {
  home: [number, number];
  azimuth: [number, number];
  elevation: [number, number];
  sway?: number;
}

const DEG_PER_PX = 0.35;
const IDLE_MS = 5000;
const SWAY_PERIOD_S = 14;

export function createOrbit(stage: HTMLElement, { home, azimuth, elevation, sway = 9 }: OrbitOptions, onInput: () => void) {
  const clamp = (v: number, [lo, hi]: [number, number]) => Math.min(hi, Math.max(lo, v));
  const view = { az: home[0], el: home[1] };
  const goal = { az: home[0], el: home[1] };
  let drag: { x: number; y: number; az: number; el: number; moved: boolean } | null = null;
  let touched = 0;
  let clock = 0;

  const set = (az: number, el: number) => {
    goal.az = clamp(az, azimuth);
    goal.el = clamp(el, elevation);
    touched = performance.now();
    onInput();
  };

  const down = (event: PointerEvent) => {
    if (event.button !== 0) return;
    drag = { x: event.clientX, y: event.clientY, az: goal.az, el: goal.el, moved: false };
  };
  const move = (event: PointerEvent) => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 4) return;
    if (!drag.moved) stage.setPointerCapture(event.pointerId);
    drag.moved = true;
    stage.dataset.dragging = '';
    set(drag.az - dx * DEG_PER_PX, drag.el + dy * DEG_PER_PX * 0.6);
  };
  const up = () => {
    drag = null;
    delete stage.dataset.dragging;
  };
  const key = (event: KeyboardEvent) => {
    const turn: Record<string, [number, number]> = { ArrowLeft: [6, 0], ArrowRight: [-6, 0], ArrowUp: [0, 4], ArrowDown: [0, -4] };
    if (event.key === 'Home') return set(home[0], home[1]);
    const step = turn[event.key];
    if (!step) return;
    event.preventDefault();
    set(goal.az + step[0], goal.el + step[1]);
  };

  stage.addEventListener('pointerdown', down);
  stage.addEventListener('pointermove', move);
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);
  stage.addEventListener('keydown', key);

  return {
    view,
    isDragging: () => Boolean(drag?.moved),
    /** Eases the view toward its goal; returns true while the camera is still moving. */
    step(dt: number, calm: boolean) {
      const idle = !drag && performance.now() - touched > IDLE_MS;
      if (idle && !calm) {
        clock += dt;
        goal.az = home[0] + Math.sin((clock / SWAY_PERIOD_S) * Math.PI * 2) * sway;
        goal.el = home[1];
      }
      view.az = follow(view.az, goal.az, dt, 0.18, calm);
      view.el = follow(view.el, goal.el, dt, 0.18, calm);
      return (idle && !calm) || view.az !== goal.az || view.el !== goal.el;
    },
    destroy() {
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', up);
      stage.removeEventListener('keydown', key);
    },
  };
}

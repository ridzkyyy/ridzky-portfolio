// Telemetry bench: a GPS tracker cabled to an edge gateway. Viewers sit on the +x/+y side.
import * as k from '../figures/iso/iso-kit';
import type { Flat, Plan, Point3, Projection } from '../figures/iso/iso-kit';

export const WIDTH = 640;
export const HEIGHT = 470;
export const HOME: [number, number] = [50, 32];
export const AZ_RANGE: [number, number] = [26, 74];
export const EL_RANGE: [number, number] = [24, 46];

const BENCH: Plan = { x: -118, y: -58, w: 236, d: 124, r: 8 };
const TRACKER: Plan = { x: -96, y: -22, w: 58, d: 40, r: 3 };
const TRACKER_H = 18;
const GATEWAY: Plan = { x: 22, y: -30, w: 56, d: 46, r: 2 };
const GATEWAY_H = 54;
const PORT: Point3 = [TRACKER.x + TRACKER.w + 4, -2, 8];
const INLET: Point3 = [40, GATEWAY.y + GATEWAY.d + 4, 9];

// The cable route on the bench, from the tracker's connector to the gateway's inlet.
const ROUTE: Point3[] = [PORT, [PORT[0] + 8, -2, 0.8], [PORT[0] + 8, 34, 0.8], [INLET[0], 34, 0.8], [INLET[0], INLET[1] + 6, 0.8], [INLET[0], INLET[1], INLET[2]]];

const EXTENT: Point3[] = [...k.boxCorners(BENCH, -14, 0), ...k.boxCorners(GATEWAY, 0, GATEWAY_H + 28), ...k.boxCorners(TRACKER, 0, TRACKER_H + 8)];
const FITTED = k.fitProjection(EXTENT, WIDTH, HEIGHT, { pad: 30, azimuth: HOME[0], elevation: HOME[1] });
let P: Projection = FITTED;

export function aim(az: number, el: number) {
  const next = { ...FITTED, azimuth: az, elevation: el };
  const a = k.iso([0, 0, 20], FITTED);
  const b = k.iso([0, 0, 20], next);
  P = { ...next, origin: [next.origin[0] + a[0] - b[0], next.origin[1] + a[1] - b[1]] };
}

const at = (point: Point3) => k.iso(point, P);
const S = k.solidSvg;
const L = k.lineSvg;
const D = k.dotsSvg;
const byDepth = (points: [number, number][]) => [...points].sort((p, q) => k.depthOf([p[0], p[1], 0], P) - k.depthOf([q[0], q[1], 0], P));
const led = (name: string, point: Point3, r = 1.7) => {
  const [x, y] = at(point);
  return `<circle class="bench-led" data-led="${name}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`;
};

function bench() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BENCH, -14, 10, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(BENCH, 18))) {
    out.push(S(k.cylinder(x, y, 7, -14, 1.4, P, 28), { tone: 'lo' }));
    out.push(S(k.cylinder(x, y, 5.4, -12.6, 2.6, P, 28), { tone: 'mid' }));
  }
  out.push(S(k.slabOf(BENCH, -10, 10, P, 8, 1.4), { tone: 'mid' }));
  out.push(L(k.planOutline(k.insetPlan(BENCH, 5), 0, P), { tone: 'faint' }));
  const screws = k.corners(BENCH, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(''), { tone: 'lo' }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  const strip: Plan = { x: -100, y: BENCH.y + BENCH.d - 15, w: 200, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: 'lo', crease: 'none' }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  // Cable clips on the bench, under the route.
  for (const [x, y] of [[PORT[0] + 8, 16], [10, 34]] as [number, number][]) {
    out.push(S(k.slabOf({ x: x - 3, y: y - 3, w: 6, d: 6, r: 1 }, 0, 0.8, P, 3), { tone: 'lo' }));
    out.push(D([at([x - 2, y, 0.8]), at([x + 2, y, 0.8])], { size: 0.4 }));
  }
  return out.join('');
}

function tracker() {
  const t = TRACKER;
  const top = TRACKER_H;
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(t, 2), 0, 2, P)}" style="filter:blur(5px)"/>`];
  for (const x of [t.x - 7, t.x + t.w]) {
    const tab: Plan = { x, y: t.y + 10, w: 7, d: 20, r: 2 };
    out.push(S(k.slabOf(tab, 0, 1.8, P, 3), { tone: 'mid' }));
    out.push(L(k.ring(x + 3.5, 0, 1.8, 1.8, P, 14), { tone: 'lo' }));
    out.push(D([at([x + 3.5, 0, 1.8])], { size: 0.5 }));
  }
  out.push(S(k.slabOf(t, 0, top, P, 6, 0.8), { tone: 'hi', crease: 'lo', inner: L(k.sideSeam(t, 12, P, 6), { tone: 'lo' }) }));
  const label: Plan = { x: t.x + 6, y: t.y + 6, w: 26, d: 16, r: 1 };
  out.push(S(k.slabOf(label, top, 0.7, P, 3), { tone: 'lo' }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.5), top + 0.7, P, 3), { tone: 'faint' }));
  [16, 11, 14].forEach((length, row) => out.push(L(k.lineOnTop([label.x + 4, label.y + 4.5 + row * 3.6], [label.x + 4 + length, label.y + 4.5 + row * 3.6], top + 0.7, P), { tone: 'lo', free: true })));
  out.push(D(k.corners(t, 3).map(([x, y]) => at([x, y, top])), { size: 0.45 }));

  // Antenna puck with its dome and a short lead.
  const [ax, ay] = [t.x + 44, t.y + 16];
  out.push(S(k.cylinder(ax, ay, 9, top, 3.4, P, 40, 0.5), { tone: 'mid' }));
  out.push(S(k.cylinder(ax, ay, 7, top + 3.4, 1.8, P, 36), { tone: 'hi', crease: 'lo' }));
  out.push(L(k.ring(ax, ay, 3, top + 5.2, P, 20), { tone: 'lo' }));

  // Status LEDs on the front face: power, satellite fix, transmit.
  const face = t.y + t.d;
  out.push(L(k.pathOf([at([t.x + 8, face, 5]), at([t.x + 30, face, 5]), at([t.x + 30, face, 9]), at([t.x + 8, face, 9])], true), { tone: 'lo' }));
  out.push(led('power', [t.x + 12, face, 7], 1.3), led('fix', [t.x + 19, face, 7], 1.3), led('tx', [t.x + 26, face, 7], 1.3));

  // Connector on the right end, where the cable leaves.
  out.push(S(k.slabOf({ x: t.x + t.w, y: -7, w: 4, d: 10, r: 1 }, 4, 8, P, 2, 0.3), { tone: 'mid' }));
  return out.join('');
}

function gateway() {
  const g = GATEWAY;
  const top = GATEWAY_H;
  const face = g.y + g.d;
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(g, 2), 0, 2, P)}" style="filter:blur(5px)"/>`];
  for (const [x, y] of byDepth(k.corners(g, 5))) out.push(S(k.cylinder(x, y, 3, 0, 2.2, P, 18), { tone: 'lo' }));
  out.push(S(k.slabOf(g, 2.2, top - 2.2, P, 2, 0.6), { tone: 'mid', inner: L(k.sideSeam(g, top - 8, P, 2), { tone: 'faint' }) }));
  const vents: string[] = [];
  for (let z = 22; z <= top - 14; z += 3.4) vents.push(k.segment([g.x + 6, face, z], [g.x + g.w - 6, face, z], P));
  out.push(L(vents.join(''), { tone: 'lo', free: true }));
  const side = g.x + g.w;
  const fins: string[] = [];
  for (let y = g.y + 6; y <= face - 6; y += 4) fins.push(k.segment([side, y, 10], [side, y, top - 12], P));
  out.push(L(fins.join(''), { tone: 'faint' }));
  out.push(led('rx', [g.x + 8, face, top - 6], 1.5));
  out.push(D([12, 16, 20].map((dx) => at([g.x + 8 + dx, face, top - 6])), { size: 1.1, tone: 'lo' }));
  // Inlet gland for the cable.
  out.push(S(k.slabOf({ x: INLET[0] - 4, y: face, w: 8, d: 4, r: 1.2 }, INLET[2] - 4, 8, P, 3, 0.3), { tone: 'mid' }));

  const plate: Plan = { x: g.x + 6, y: g.y + 6, w: 22, d: 14, r: 1 };
  out.push(S(k.slabOf(plate, top, 0.7, P, 3), { tone: 'lo' }));
  [14, 9].forEach((length, row) => out.push(L(k.lineOnTop([plate.x + 4, plate.y + 5 + row * 4], [plate.x + 4 + length, plate.y + 5 + row * 4], top + 0.7, P), { tone: 'lo', free: true })));
  for (const [x, y] of byDepth([[g.x + 40, g.y + 10], [g.x + 46, g.y + 34]])) {
    out.push(S(k.cylinder(x, y, 2.6, top, 2, P, 18), { tone: 'mid' }));
    out.push(S(k.cylinder(x, y, 1.1, top + 2, 24, P, 12), { tone: 'mid', crease: 'none' }));
    out.push(S(k.cylinder(x, y, 1.7, top + 26, 1.6, P, 12), { tone: 'hi', crease: 'lo' }));
  }
  return out.join('');
}

function cable() {
  const points = ROUTE.map(at);
  return [
    `<path class="bench-cable" d="${k.pathOf(points)}"/>`,
    L(k.pathOf(points), { tone: 'mid' }),
    `<circle class="iso-wire-end" cx="${points[0][0].toFixed(1)}" cy="${points[0][1].toFixed(1)}" r="1.4"/>`,
    `<circle class="iso-wire-end" cx="${points[points.length - 1][0].toFixed(1)}" cy="${points[points.length - 1][1].toFixed(1)}" r="1.4"/>`,
  ].join('');
}

export function benchBody() {
  return `${bench()}${tracker()}${gateway()}${cable()}<circle class="bench-fix" r="2.6" opacity="0"/>`;
}

/** Screen point at fraction `u` along the cable. */
export function alongCable(u: number): Flat {
  const points = ROUTE.map(at);
  const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  let left = u * lengths.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (left <= lengths[i]) {
      const f = lengths[i] ? left / lengths[i] : 0;
      return [points[i][0] + (points[i + 1][0] - points[i][0]) * f, points[i][1] + (points[i + 1][1] - points[i][1]) * f];
    }
    left -= lengths[i];
  }
  return points[points.length - 1];
}

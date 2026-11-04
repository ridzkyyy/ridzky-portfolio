import { useEffect, useRef } from 'react';

// A faint street network with vehicles moving along it, drawn behind the hero.
// Routes are fixed curves in a unit square so the picture is the same on every load.
const ROUTES: [number, number][][] = [
  [[-0.05, 0.78], [0.18, 0.7], [0.36, 0.74], [0.55, 0.6], [0.74, 0.62], [1.05, 0.48]],
  [[0.12, -0.05], [0.2, 0.22], [0.31, 0.42], [0.36, 0.74], [0.41, 1.05]],
  [[0.48, -0.05], [0.56, 0.18], [0.55, 0.6], [0.6, 0.86], [0.66, 1.05]],
  [[-0.05, 0.3], [0.2, 0.22], [0.42, 0.28], [0.56, 0.18], [0.8, 0.24], [1.05, 0.16]],
  [[0.74, 0.62], [0.8, 0.24], [0.86, -0.05]],
  [[0.6, 0.86], [0.82, 0.9], [1.05, 0.82]],
  [[0.31, 0.42], [0.55, 0.6]],
];
const VEHICLES = 18;
const TRAIL = 0.05;
const PULSE_S = 3.2;
// Junctions where routes meet; each one pings like a stop being reported.
const STOPS: [number, number][] = [[0.36, 0.74], [0.55, 0.6], [0.2, 0.22], [0.56, 0.18], [0.74, 0.62], [0.31, 0.42], [0.6, 0.86]];

interface Vehicle {
  route: number;
  at: number;
  speed: number;
}

function pointOn(route: [number, number][], t: number): [number, number] {
  const scaled = Math.min(0.9999, Math.max(0, t)) * (route.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const [ax, ay] = route[i];
  const [bx, by] = route[i + 1];
  return [ax + (bx - ax) * f, ay + (by - ay) * f];
}

export function RouteField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const style = getComputedStyle(canvas);
    const road = style.getPropertyValue('--route-road').trim() || 'rgba(20,26,33,0.07)';
    const dot = style.getPropertyValue('--route-dot').trim() || '#0d7480';
    const trailRgb = style.getPropertyValue('--route-trail').trim() || '13, 116, 128';
    let seed = 7;
    const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const vehicles: Vehicle[] = Array.from({ length: VEHICLES }, (_, i) => ({
      route: i % ROUTES.length,
      at: random(),
      speed: 0.018 + random() * 0.03,
    }));
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let visible = true;
    let clock = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = road;
      ctx.lineWidth = 7;
      for (const route of ROUTES) {
        ctx.beginPath();
        route.forEach(([x, y], i) => (i ? ctx.lineTo(x * width, y * height) : ctx.moveTo(x * width, y * height)));
        ctx.stroke();
      }
      STOPS.forEach(([x, y], i) => {
        const phase = ((clock / PULSE_S + i / STOPS.length) % 1 + 1) % 1;
        ctx.strokeStyle = `rgba(${trailRgb}, ${(0.5 * (1 - phase)).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x * width, y * height, 4 + phase * 26, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(${trailRgb}, 0.6)`;
        ctx.beginPath();
        ctx.arc(x * width, y * height, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      for (const v of vehicles) {
        const route = ROUTES[v.route];
        const [hx, hy] = pointOn(route, v.at);
        const [tx, ty] = pointOn(route, v.at - TRAIL);
        const trail = ctx.createLinearGradient(tx * width, ty * height, hx * width, hy * height);
        trail.addColorStop(0, `rgba(${trailRgb}, 0)`);
        trail.addColorStop(1, `rgba(${trailRgb}, 0.7)`);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(tx * width, ty * height);
        ctx.lineTo(hx * width, hy * height);
        ctx.stroke();
        const halo = ctx.createRadialGradient(hx * width, hy * height, 0, hx * width, hy * height, 14);
        halo.addColorStop(0, `rgba(${trailRgb}, 0.35)`);
        halo.addColorStop(1, `rgba(${trailRgb}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(hx * width, hy * height, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = dot;
        ctx.beginPath();
        ctx.arc(hx * width, hy * height, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      clock += dt;
      for (const v of vehicles) {
        v.at += v.speed * dt;
        if (v.at > 1 + TRAIL) {
          v.at = -TRAIL;
          v.route = Math.floor(random() * ROUTES.length);
        }
      }
      draw();
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    resize();
    draw();
    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !still && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    io.observe(canvas);
    return () => {
      observer.disconnect();
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={ref} className="route-field" aria-hidden="true" />;
}

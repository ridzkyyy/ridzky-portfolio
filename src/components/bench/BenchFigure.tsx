import { useEffect, useRef } from 'react';
import { createOrbit } from '../figures/orbit';
import { frameLoop, mountSvg, svgSource } from '../figures/runtime';
import '../figures/iso/iso.css';
import '../figures/figure.css';
import { AZ_RANGE, EL_RANGE, HEIGHT, HOME, WIDTH, aim, alongCable, benchBody } from './geometry';

const PERIOD_S = 2.4;
const TX_S = 0.3;
const TRAVEL_S = 1.2;
const LABEL =
  'A GPS tracker on a workbench, cabled to an edge gateway. Every few seconds the tracker sends a position fix down the cable and the gateway lights when it arrives.';

export function BenchFigure({ label, readout }: { label: string; readout: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let clock = 0;
    let aimed = [NaN, NaN];
    let parts: { fix: SVGCircleElement | null; tx: Element | null; rx: Element | null; gps: Element | null } = { fix: null, tx: null, rx: null, gps: null };

    const build = (az: number, el: number) => {
      aim(az, el);
      mountSvg(stage, svgSource(WIDTH, HEIGHT, LABEL, benchBody()));
      parts = {
        fix: stage.querySelector('.bench-fix'),
        tx: stage.querySelector('[data-led="tx"]'),
        rx: stage.querySelector('[data-led="rx"]'),
        gps: stage.querySelector('[data-led="fix"]'),
      };
      parts.gps?.setAttribute('data-on', '');
      aimed = [az, el];
    };

    const place = () => {
      const t = clock % PERIOD_S;
      const u = (t - TX_S) / TRAVEL_S;
      const moving = u > 0 && u < 1;
      parts.tx?.toggleAttribute('data-on', t < TX_S + 0.15);
      parts.rx?.toggleAttribute('data-on', u >= 1 && u < 1.35);
      if (parts.fix) {
        const [x, y] = alongCable(Math.min(1, Math.max(0, u)));
        parts.fix.setAttribute('cx', x.toFixed(1));
        parts.fix.setAttribute('cy', y.toFixed(1));
        parts.fix.setAttribute('opacity', moving ? '1' : '0');
      }
    };

    const orbit = createOrbit(stage, { home: HOME, azimuth: AZ_RANGE, elevation: EL_RANGE }, () => loop.kick());
    const loop = frameLoop(stage, (dt, calm) => {
      orbit.step(dt, calm);
      const { az, el } = orbit.view;
      const grain = orbit.isDragging() ? 0.05 : 0.4;
      if (Math.abs(az - aimed[0]) > grain || Math.abs(el - aimed[1]) > grain) build(az, el);
      if (!calm) clock += dt;
      place();
      return !calm;
    });
    build(HOME[0], HOME[1]);
    place();
    return () => {
      loop.stop();
      orbit.destroy();
    };
  }, []);

  return (
    <figure className="bench iso">
      <div className="iso-plate">
        <div ref={stageRef} className="iso-stage" tabIndex={0} aria-label={label} />
        <p className="plate-readout">{readout}</p>
      </div>
    </figure>
  );
}

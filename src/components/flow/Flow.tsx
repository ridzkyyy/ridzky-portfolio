import { useEffect, useRef, useState } from 'react';

export interface Step {
  label: string;
  detail: string;
}

const STEP_MS = 1700;

/** One event moving through a system's real stages; pointing at a stage holds it there. */
export function Flow({ title, steps }: { title: string; steps: Step[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  const rootRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(() => setActive((i) => (i + 1) % steps.length), STEP_MS);
    });
    io.observe(root);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [steps.length]);

  const shown = held ?? active;

  return (
    <ol
      ref={rootRef}
      className="flow"
      aria-label={`${title}, stage by stage`}
      style={{ ['--count' as string]: steps.length, ['--at' as string]: shown }}
      onPointerLeave={() => setHeld(null)}
    >
      {steps.map((s, i) => (
        <li
          key={s.label}
          className="flow-step"
          data-on={i === shown ? '' : undefined}
          data-done={i < shown ? '' : undefined}
          tabIndex={0}
          onPointerEnter={() => setHeld(i)}
          onFocus={() => setHeld(i)}
          onBlur={() => setHeld(null)}
        >
          <span className="flow-label">{s.label}</span>
          <span className="flow-detail">{s.detail}</span>
        </li>
      ))}
    </ol>
  );
}

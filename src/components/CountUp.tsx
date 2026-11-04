import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1400;

// Counts the number inside a label like "~IDR 300M" or ">90%" up from zero when it comes into view.
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const target = match ? Number(match[2].replace(',', '.')) : 0;
  const [shown, setShown] = useState(match ? 0 : target);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target);
      return;
    }
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const u = Math.min(1, (now - start) / DURATION_MS);
        setShown(Math.round(target * (1 - (1 - u) ** 3)));
        if (u < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // match is derived from value, so value is the only real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) return <b>{value}</b>;
  return (
    <b ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {match[1]}
        {shown}
        {match[3]}
      </span>
    </b>
  );
}

export interface PipeStep {
  label: string;
  detail?: string;
}

interface FlowPipelineProps {
  steps: PipeStep[];
  /** seconds for one pulse traversal */
  speed?: number;
}

const W = 1000;
const H = 64;
const Y = 30;

/** Horizontal animated pipeline: hairline track, flowing dashes, a glowing
 *  pulse traveling node to node, labels aligned under each node. */
export function FlowPipeline({ steps, speed = 5 }: FlowPipelineProps) {
  const n = steps.length;
  const xs = steps.map((_, i) => ((i + 0.5) * W) / n);
  const path = `M ${xs[0]} ${Y} L ${xs[n - 1]} ${Y}`;

  return (
    <div className="pipeline" style={{ ['--n' as string]: n }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <path d={path} className="pipe-path" />
        <path d={path} className="pipe-dash" />
        <circle r="5" className="pipe-pulse">
          <animateMotion dur={`${speed}s`} repeatCount="indefinite" path={path} />
        </circle>
        {xs.map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={Y}
            r="6.5"
            className={`pipe-node${i === 0 || i === n - 1 ? ' terminal' : ''}`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="pipe-labels">
        {steps.map((s) => (
          <div key={s.label}>
            <b>{s.label}</b>
            {s.detail ? <span>{s.detail}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

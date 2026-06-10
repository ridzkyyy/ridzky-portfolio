export interface FlowStep {
  label: string;
  detail: string;
}

interface FlowDiagramProps {
  title: string;
  steps: FlowStep[];
}

export function FlowDiagram({ title, steps }: FlowDiagramProps) {
  return (
    <figure className="flow reveal">
      <figcaption className="flow-title">{title}</figcaption>
      <ol>
        {steps.map((s) => (
          <li className="flow-step" key={s.label}>
            <span className="flow-dot" aria-hidden="true" />
            <div>
              <b>{s.label}</b>
              <span>{s.detail}</span>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

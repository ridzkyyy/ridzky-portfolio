import { useLang } from '../i18n/lang';
import { Flow } from './flow/Flow';
import './flow/flow.css';

export function SystemsAtlas() {
  const { t } = useLang();
  const s = t.systems;
  return (
    <section className="section" id="systems" aria-labelledby="systems-heading">
      <div className="column">
        <h2 id="systems-heading">{s.title}</h2>
        <p className="lead">{s.lead}</p>
      </div>

      {s.items.map((system) => (
        <article className="system" key={system.stack.join() + system.steps.length + system.title}>
          <div className="column">
            <p className="chapter">{system.chapter}</p>
            <h3>{system.title}</h3>
            <p>{system.desc}</p>
          </div>
          <Flow title={system.title} steps={system.steps} />
          <p className="column stack-line">
            {s.built} {system.stack.join(', ')}.
          </p>
        </article>
      ))}

      <div className="column ledger-block">
        <h3>{s.smallerTitle}</h3>
        <dl className="ledger">
          {s.smaller.map((m) => (
            <div className="ledger-row" key={m.name}>
              <dt>{m.name}</dt>
              <dd>{m.what}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

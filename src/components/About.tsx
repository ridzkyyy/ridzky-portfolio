import { useLang } from '../i18n/lang';

export function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section className="section wrap about" id="about" aria-labelledby="about-heading">
      <div className="about-text">
        <h2 id="about-heading">{a.title}</h2>
        {a.text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="about-side">
        <dl className="pairs">
          {a.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        <h3>{a.toolboxTitle}</h3>
        <dl className="pairs">
          {a.toolbox.map((x) => (
            <div key={x.k}>
              <dt>{x.k}</dt>
              <dd>{x.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

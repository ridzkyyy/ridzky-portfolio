import { useLang } from '../i18n/lang';

export function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <h2 id="about-heading" className="column">
        {a.title}
      </h2>
      <div className="about-row">
        <dl className="facts">
          {a.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        <p className="about-text">{a.text}</p>
      </div>
      <div className="about-row">
        <p className="record-word">{a.toolboxWord}</p>
        <dl className="record pairs">
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

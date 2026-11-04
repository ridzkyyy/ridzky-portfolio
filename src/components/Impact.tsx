import { useLang } from '../i18n/lang';

export function Impact() {
  const { t } = useLang();
  return (
    <section className="impact" aria-labelledby="impact-heading">
      <div className="wrap">
        <h2 id="impact-heading">{t.impact.title}</h2>
        <ul>
          {t.impact.items.map((m) => (
            <li key={m.k}>
              <b>{m.v}</b>
              <span>{m.k}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

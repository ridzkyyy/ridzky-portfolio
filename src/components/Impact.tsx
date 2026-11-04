import { useLang } from '../i18n/lang';
import { CountUp } from './CountUp';

export function Impact() {
  const { t } = useLang();
  return (
    <section className="impact" aria-labelledby="impact-heading">
      <div className="wrap">
        <h2 id="impact-heading" className="reveal">{t.impact.title}</h2>
        <ul>
          {t.impact.items.map((m) => (
            <li key={m.k} className="reveal">
              <CountUp key={m.v} value={m.v} />
              <span>{m.k}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

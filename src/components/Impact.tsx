import { useLang } from '../i18n/lang';

export function Impact() {
  const { t } = useLang();
  return (
    <section className="impact" aria-label={t.impact.label}>
      <ul>
        {t.impact.items.map((m) => (
          <li key={m.k}>
            <b>{m.v}</b>
            <span>{m.k}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

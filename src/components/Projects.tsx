import { useLang } from '../i18n/lang';

export function Projects() {
  const { t } = useLang();
  return (
    <section className="section wrap" id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">{t.projects.title}</h2>
      <ul className="project-list">
        {t.projects.items.map((p) => (
          <li key={p.name}>
            <h3>{p.name}</h3>
            <p className="tag">{p.kind}</p>
            <p>{p.what}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

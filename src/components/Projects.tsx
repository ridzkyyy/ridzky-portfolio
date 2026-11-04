import { useLang } from '../i18n/lang';

export function Projects() {
  const { t } = useLang();
  const { blurred } = t.work;
  // Projects with a screen to show lead the list.
  const items = [...t.projects.items].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  return (
    <section className="section wrap" id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="reveal">
        {t.projects.title}
      </h2>
      <ul className="project-list">
        {items.map((p) => (
          <li key={p.name} className={p.image ? 'reveal has-image' : 'reveal'}>
            {p.image ? (
              <div className="project-shot">
                <img src={p.image.src} alt={p.image.alt} loading="lazy" width={1100} height={600} />
                {p.image.blurred ? <span className="privacy">{blurred}</span> : null}
              </div>
            ) : null}
            <h3>{p.name}</h3>
            <p className="tag">{p.kind}</p>
            <p>{p.what}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

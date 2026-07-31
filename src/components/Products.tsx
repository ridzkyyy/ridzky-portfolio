export function Products() {
  return (
    <section className="section" id="products" aria-labelledby="products-heading">
      <div className="wrap">
        <div className="section-head">
          <span className="num">03 / SHIPPED.SOLO</span>
          <h2 id="products-heading">
            Independent <span className="hl">products</span>
          </h2>
        </div>
        <div className="shelf">
          <article className="card">
            <div className="shot">
              <img
                src="/media/rekapmbg-hero.jpg"
                alt="rekapmbg.id landing page — operational platform for Indonesia's MBG program"
                loading="lazy"
                width={1200}
                height={750}
              />
            </div>
            <div className="card-body">
              <span className="kind">SaaS · solo-built, in production</span>
              <h3>rekapmbg.id</h3>
              <p>
                Operational ERP for Indonesia's MBG school-meal program: supply chain, kitchen
                production, fleet distribution, finance, and government (BGN) reporting — designed,
                built, shipped, and sold by one person.
              </p>
              <div className="card-links">
                <a href="https://rekapmbg.id" target="_blank" rel="noreferrer">
                  rekapmbg.id ↗
                </a>
              </div>
            </div>
          </article>
          <article className="card">
            <div className="shot">
              <img
                src="/media/rekapmbg-features.jpg"
                alt="rekapmbg.id feature overview — finance report center and operations modules"
                loading="lazy"
                width={1200}
                height={750}
              />
            </div>
            <div className="card-body">
              <span className="kind">Under the hood</span>
              <h3>Built like a product, run like ops</h3>
              <p>
                React 19 · TypeScript · Supabase (Postgres, Realtime, Storage) · Playwright E2E ·
                CI/CD — 84+ PRs of iterative delivery, feature flags, and a finance module that has
                to reconcile to the rupiah. Plus community builds: a foundation site with online
                donations, and more.
              </p>
              <div className="card-links">
                <a href="https://github.com/ridzkyyy" target="_blank" rel="noreferrer">
                  More on GitHub ↗
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

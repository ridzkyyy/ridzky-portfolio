export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="num">04</span>
          <h2 id="about-heading">
            About <em>me</em>
          </h2>
        </div>
        <div className="about-grid">
          <p className="big reveal">
            I'm a technical project manager with an engineer's hands. I sit between
            <em> field operations and engineering</em> — translating dispatcher pain into
            architecture, and architecture into systems that survive contact with real trucks,
            real drivers, and real deadlines.
          </p>
          <ul className="fact-list reveal">
            <li>
              <span className="k">Role</span>
              <span className="v">Technical Project Manager, Lacak.io (GPS tracking & fleet)</span>
            </li>
            <li>
              <span className="k">Domains</span>
              <span className="v">Fleet ops · IoT telemetry · real-time systems · logistics integrations</span>
            </li>
            <li>
              <span className="k">Backend</span>
              <span className="v">Python · Java/Spring · Node/TypeScript · PostgreSQL · Redis · MQTT</span>
            </li>
            <li>
              <span className="k">Delivery</span>
              <span className="v">Docker · Jenkins/GitHub Actions · Grafana · E2E testing</span>
            </li>
            <li>
              <span className="k">Now exploring</span>
              <span className="v">AI engineering — MCP tooling, CV inference, agent-ready systems</span>
            </li>
            <li>
              <span className="k">Published</span>
              <span className="v">Jurnal Algoritma — sales analytics platform (Moving Average method)</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

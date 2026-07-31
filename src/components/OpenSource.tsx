const PROJECTS = [
  {
    kind: 'Open source · MCP client',
    name: 'MCP Lab',
    desc: '"Postman for MCP servers" — connect to any Model Context Protocol server, browse its tools, run them from schema-generated forms, read formatted results. Live, MIT, CI-green.',
    media: '/media/mcp-lab.gif',
    alt: 'MCP Lab demo — connecting to an MCP server and running a tool',
    links: [
      { label: 'Live demo ↗', href: 'https://mcp-lab.vercel.app' },
      { label: 'GitHub ↗', href: 'https://github.com/ridzkyyy/mcp-lab' },
    ],
  },
  {
    kind: 'Open source · MCP server',
    name: 'fleet-mcp',
    desc: 'Fleet telemetry MCP server: GPS positions, trips, geofence events, NMEA parsing — exposed as typed tools for AI agents, with a deterministic simulated Jakarta fleet. Where my day job meets the agent era.',
    media: '/media/fleet-mcp.gif',
    alt: 'fleet-mcp demo — MCP Lab connected to the live fleet server',
    links: [
      { label: 'Live endpoint ↗', href: 'https://fleet-mcp.vercel.app' },
      { label: 'GitHub ↗', href: 'https://github.com/ridzkyyy/fleet-mcp' },
    ],
  },
];

export function OpenSource() {
  return (
    <section className="section" id="open-source" aria-labelledby="oss-heading">
      <div className="wrap">
        <div className="section-head">
          <span className="num">02 / PUBLIC.REPOS</span>
          <h2 id="oss-heading">
            Open <span className="hl">source</span>
          </h2>
          <p className="sub">
            Live, MIT-licensed, CI-green — and they talk to each other: MCP Lab is the client,
            fleet-mcp is the server it connects to.
          </p>
        </div>
        <div className="shelf">
          {PROJECTS.map((p) => (
            <article className="card" key={p.name}>
              <div className="shot">
                <img src={p.media} alt={p.alt} loading="lazy" width={960} height={600} />
              </div>
              <div className="card-body">
                <span className="kind">{p.kind}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="card-links">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

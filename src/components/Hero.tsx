import { HeroMap } from './HeroMap';

const NAV = [
  { label: 'Systems', href: '#systems' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-top">
        <span className="brand" data-text="RGN://OPS">
          RGN://OPS
        </span>
        <nav aria-label="Main navigation">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="nav-link" data-text={item.label}>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <HeroMap />
      <div className="wrap hero-body">
        <div className="status-chips">
          <span className="chip">
            <span className="dot" aria-hidden="true" /> Tracking · Live
          </span>
          <span className="chip">Jakarta · UTC+7</span>
          <span className="chip">Open to remote</span>
        </div>
        <h1>
          <span className="line-mask">
            <span className="line stroke">Ridzky Guntur</span>
          </span>
          <span className="line-mask">
            <span className="line fill">Nuriawan</span>
          </span>
        </h1>
        <p className="lede">
          Technical Project Manager at <strong>Lacak.io</strong>. I ship the backend systems
          behind <strong>real fleets</strong> — GPS telemetry pipelines, AI safety monitoring,
          and the integrations that keep national-scale logistics honest.
        </p>
        <div className="hero-cta">
          <a className="btn primary" href="#systems" data-magnetic>
            ./view-systems ↓
          </a>
          <a
            className="btn"
            href="https://github.com/ridzkyyy"
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            GitHub
          </a>
          <a
            className="btn"
            href="https://id.linkedin.com/in/ridzky-guntur-nuriawan-10346a1bb"
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="wrap hero-foot">
        <span>GPS · IoT · Real-time</span>
        <span>Engineering for operations</span>
      </div>
    </header>
  );
}

import { HeroMap } from './HeroMap';

export function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-top">
        <span className="brand">RGN://OPS</span>
        <nav aria-label="Main navigation">
          <a href="#systems">Systems</a>
          <a href="#open-source">Open Source</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <HeroMap />
      <div className="wrap hero-body">
        <div className="status-chips reveal">
          <span className="chip">
            <span className="dot" aria-hidden="true" /> Tracking · Live
          </span>
          <span className="chip">Jakarta · UTC+7</span>
          <span className="chip">Open to remote</span>
        </div>
        <h1>
          <span className="stroke">Ridzky Guntur</span>
          <span className="fill">Nuriawan</span>
        </h1>
        <p className="lede reveal">
          Technical Project Manager at <strong>Lacak.io</strong>. I ship the backend systems
          behind <strong>real fleets</strong> — GPS telemetry pipelines, AI safety monitoring,
          and the integrations that keep national-scale logistics honest.
        </p>
        <div className="hero-cta reveal">
          <a className="btn primary" href="#systems">
            ./view-systems ↓
          </a>
          <a className="btn" href="https://github.com/ridzkyyy" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            className="btn"
            href="https://id.linkedin.com/in/ridzky-guntur-nuriawan-10346a1bb"
            target="_blank"
            rel="noreferrer"
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

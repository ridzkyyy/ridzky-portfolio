export function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-top">
        <span className="brand">RGN — 2026</span>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#open-source">Open Source</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div className="wrap">
        <p className="eyebrow reveal">Jakarta, Indonesia · Technical Project Manager @ Lacak.io</p>
        <h1 className="reveal">
          Ridzky Guntur
          <em>Nuriawan</em>
        </h1>
        <p className="lede reveal">
          I ship operational systems that move <strong>real fleets</strong> — GPS tracking,
          IoT telemetry, AI monitoring, and the integrations that keep national-scale
          logistics honest. <strong>Engineering for operations, not just code.</strong>
        </p>
        <div className="hero-cta reveal">
          <a className="btn primary" href="#work">
            Selected work ↓
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
        <span>Open to remote</span>
      </div>
    </header>
  );
}

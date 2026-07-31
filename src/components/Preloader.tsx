/** Boot overlay played once per session; timing lives in motion/intro.ts. */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="pre-inner">
        <span className="pre-label mono" data-text="INIT · TELEMETRY LINK">
          INIT · TELEMETRY LINK
        </span>
        <span className="pre-count mono">000</span>
        <span className="pre-bar">
          <i />
        </span>
      </div>
    </div>
  );
}

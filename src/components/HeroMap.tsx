const ROUTE =
  'M 60 470 L 150 430 L 210 350 L 300 330 L 360 250 L 470 230 L 520 150 L 600 120';

const WAYPOINTS = [
  { x: 60, y: 470 },
  { x: 210, y: 350 },
  { x: 360, y: 250 },
  { x: 600, y: 120 },
];

/** Animated route map: a telemetry track drawing itself across a grid,
 *  with a vehicle pulse traveling the line and pings at the stops. */
export function HeroMap() {
  return (
    <svg
      className="hero-map"
      viewBox="0 0 660 600"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <radialGradient id="fade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="edge">
          <rect width="660" height="600" fill="url(#fade)" />
        </mask>
      </defs>
      <g mask="url(#edge)">
        {/* dotted grid */}
        {Array.from({ length: 11 }, (_, r) =>
          Array.from({ length: 12 }, (_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={30 + c * 55}
              cy={30 + r * 55}
              r="1.4"
              fill="rgba(130,148,171,0.28)"
            />
          )),
        )}
        {/* geofence */}
        <circle
          cx="360"
          cy="250"
          r="58"
          stroke="rgba(251,191,36,0.4)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        {/* route */}
        <path d={ROUTE} className="route-draw" stroke="rgba(45,212,191,0.8)" strokeWidth="2" />
        {/* waypoint pings */}
        {WAYPOINTS.map((w) => (
          <g key={`${w.x}-${w.y}`}>
            <circle className="ping" cx={w.x} cy={w.y} r="9" stroke="rgba(45,212,191,0.5)" strokeWidth="1.2" />
            <circle cx={w.x} cy={w.y} r="3.5" fill="#2dd4bf" />
          </g>
        ))}
        {/* traveling vehicle pulse */}
        <circle className="hero-pulse" r="5.5" fill="#2dd4bf">
          <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={ROUTE} />
        </circle>
        <circle className="hero-pulse" r="11" fill="rgba(45,212,191,0.22)">
          <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} />
        </circle>
      </g>
    </svg>
  );
}

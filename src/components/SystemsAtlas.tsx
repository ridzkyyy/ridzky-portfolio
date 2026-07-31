import { FlowPipeline, type PipeStep } from './FlowPipeline';

interface FeaturedSystem {
  id: string;
  title: string;
  desc: string;
  steps: PipeStep[];
  tags: string[];
  speed: number;
}

const FEATURED: FeaturedSystem[] = [
  {
    id: 'SYS.01 — EVENT PIPELINE',
    title: 'Real-time fleet event pipeline',
    desc: 'Decoupled Kafka pipeline that turns raw GPS streams into typed alert notifications at scale — partition-keyed ordering, parallel evaluators, dead-letter handling, and a watchdog that would rather restart than lag behind the road.',
    steps: [
      { label: 'telemetry ws', detail: 'raw positions & device events streaming in' },
      { label: 'kafka ingest', detail: 'partition-keyed topics, hours-scale retention' },
      { label: 'evaluators', detail: 'geofence · speeding · harsh driving · jamming · power-cut, in parallel' },
      { label: 'notification topic', detail: 'typed events, replayable' },
      { label: 'persist + push', detail: 'batch insert + WebSocket to the command center' },
    ],
    tags: ['Java 17', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'WebSocket'],
    speed: 4,
  },
  {
    id: 'SYS.02 — DEVICE GATEWAY',
    title: 'GPS device gateway & protocol proxy',
    desc: 'Async multiprocess TCP proxy speaking the Teltonika binary protocol end-to-end: AVL decode, a nine-rule GPS quality gate (teleports, jitter, impossible speeds), backpressure-aware relay, offline buffering, and an over-the-air command queue back to the device.',
    steps: [
      { label: 'tracker fleet', detail: 'binary AVL frames over raw TCP, IMEI handshake' },
      { label: 'protocol decode', detail: 'Codec 08 / 8E / 16 parsing' },
      { label: 'quality gate', detail: 'drop teleports, jitter, zero-fix, impossible speed' },
      { label: 'ack relay', detail: 'bounded queue → tracking core, backpressure-aware' },
      { label: 'buffer + commands', detail: 'Redis offline buffer · OTA command delivery' },
    ],
    tags: ['Python asyncio', 'uvloop', 'Redis', 'PostgreSQL', 'TCP / binary protocols'],
    speed: 5,
  },
  {
    id: 'SYS.03 — PLATFORM CORE',
    title: 'Fleet platform system of record',
    desc: 'The multi-tenant core every other service orbits: five datastores, road-snapped trip reconstruction with plausibility-checked gap bridging, alert rules, geofencing, reporting, and dual WebSocket protocols feeding the live command center.',
    steps: [
      { label: 'positions in', detail: 'device stream → last-state cache' },
      { label: 'system of record', detail: 'PostgreSQL primary + columnar archive' },
      { label: 'trip rebuild', detail: 'road-snapping + gap bridging, plausibility-checked' },
      { label: 'business rules', detail: 'alerts · geofences · multi-tenant RBAC · reports' },
      { label: 'command center', detail: 'REST + live WebSocket to dispatcher screens' },
    ],
    tags: ['Java 17', 'Spring Boot', 'PostgreSQL', 'Redis', 'ClickHouse', 'OSRM'],
    speed: 6,
  },
];

interface MiniSystem {
  id: string;
  name: string;
  purpose: string;
  flow: { label: string; detail?: string }[];
}

const MINIS: MiniSystem[] = [
  {
    id: 'AI.04',
    name: 'Driver-fatigue AI validator',
    purpose: 'Turns dashcam alarms into confidence-scored incident tickets.',
    flow: [
      { label: 'alarm over websocket', detail: 'eyes-closed / yawning candidates' },
      { label: 'clip download w/ retry' },
      { label: 'face extract → PyTorch inference', detail: 'MediaPipe / SCRFD fallback chain' },
      { label: 'confidence-gated ticket', detail: 'only real fatigue reaches ops' },
    ],
  },
  {
    id: 'TRP.05',
    name: 'Trip & idle detection engine',
    purpose: 'Stateful batch engine writing structured trips from raw positions.',
    flow: [
      { label: 'windowed position reads', detail: 'columnar store, per-device batches' },
      { label: 'trip state machine', detail: 'speed + displacement thresholds' },
      { label: 'smart filter', detail: 'teleport drop · micro-stop merge · gap bridge' },
      { label: 'idempotent upserts', detail: 'deterministic IDs — reruns are safe' },
    ],
  },
  {
    id: 'ANL.06',
    name: 'Analytics partner bridge',
    purpose: 'Hourly device telemetry, calibrated and delivered to a partner API.',
    flow: [
      { label: 'MQTT hourly payloads' },
      { label: 'calibration cache + fuel metrics', detail: 'per-device profiles, zone mapping' },
      { label: 'real-time columnar writes' },
      { label: 'OAuth batch delivery', detail: 'scheduled drain to partner endpoint' },
    ],
  },
  {
    id: 'SPX.07',
    name: 'Last-mile reporting suite (SPX)',
    purpose: 'Nine scheduled detectors over a national last-mile fleet.',
    flow: [
      { label: 'MQTT sensor + movement feeds' },
      { label: 'detector jobs', detail: 'abnormality · unauthorized stop · out-of-route…' },
      { label: 'PostgreSQL + Sheets exports' },
      { label: 'minute-level state push', detail: 'signed delivery to client API' },
    ],
  },
  {
    id: 'CMP.08',
    name: 'Compliance event store (SPX)',
    purpose: 'Adaptive sync + classification feeding compliance dashboards.',
    flow: [
      { label: 'adaptive API pull', detail: 'retry, backoff, windowing' },
      { label: 'event classification', detail: 'unsafe · unutilised · out-of-zone transitions' },
      { label: 'idempotent event tables', detail: 'deadlock-aware upserts' },
      { label: 'mile-stage dashboards', detail: 'first / middle / last-mile APIs' },
    ],
  },
  {
    id: 'MIN.09',
    name: 'Mining fleet live monitoring',
    purpose: 'Multi-topic telemetry to live dashboards for heavy equipment.',
    flow: [
      { label: 'MQTT — six topic families', detail: 'engine · task · working-status · fleet' },
      { label: 'projection + dedup', detail: 'buffered, thread-pooled' },
      { label: 'columnar batch inserts' },
      { label: 'STOMP live topics', detail: 'dashboard + live map push' },
    ],
  },
  {
    id: 'CTV.10',
    name: 'Dashcam alarm platform',
    purpose: 'Alarm lifecycle from vendor CCTV to validated ops tickets.',
    flow: [
      { label: 'vendor alarm websocket' },
      { label: 'video watcher upload', detail: 'clip files staged for inference' },
      { label: 'AI validation loop', detail: 'feeds the fatigue validator above' },
      { label: 'ticket + shift dashboards', detail: 'quota & cluster rules per site' },
    ],
  },
  {
    id: 'DSP.11',
    name: 'Dispatch & tablet OTA backend',
    purpose: 'Assignments to mining tablets, plus app updates over the air.',
    flow: [
      { label: 'machine MQTT topics' },
      { label: 'assignment engine', detail: 'driver ↔ machine ↔ tracker' },
      { label: 'tablet WebSocket push', detail: 'per-device assignment topics' },
      { label: 'OTA via presigned URLs', detail: 'versioned APK + remote config' },
    ],
  },
  {
    id: 'PLM.12',
    name: 'Payload tablet (Android)',
    purpose: 'Offline-first payload monitoring riding shotgun in excavators.',
    flow: [
      { label: 'RS485 + GPS + voltage', detail: 'native serial via NDK' },
      { label: 'machine-state inference', detail: 'per-profile: OHT · EXCA · dozer' },
      { label: 'offline-first queue', detail: 'Room DB → batched sync when signal returns' },
      { label: 'shift reports', detail: 'CSV export at logout, even with no network' },
    ],
  },
];

export function SystemsAtlas() {
  return (
    <section className="section" id="systems" aria-labelledby="systems-heading">
      <div className="wrap">
        <div className="section-head">
          <span className="num">01 / SYS.ATLAS</span>
          <h2 id="systems-heading">
            Backend <span className="hl">systems</span>
          </h2>
          <p className="sub">
            Production systems I lead and build at Lacak.io — drawn from the real architectures,
            redrawn for public view. Flows are faithful; internals and client specifics stay private.
          </p>
        </div>

        {FEATURED.map((s) => (
          <article className="featured-system" key={s.id}>
            <div className="sys-head">
              <h3>{s.title}</h3>
              <span className="sys-id mono">{s.id}</span>
            </div>
            <p className="desc">{s.desc}</p>
            <FlowPipeline steps={s.steps} speed={s.speed} />
            <ul className="sys-tags">
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}

        <div className="atlas-grid">
          {MINIS.map((m) => (
            <article className="mini-system" key={m.id}>
              <span className="sys-id mono">{m.id}</span>
              <h4>{m.name}</h4>
              <p className="purpose">{m.purpose}</p>
              <ol className="mini-flow">
                {m.flow.map((f) => (
                  <li key={f.label}>
                    {f.label}
                    {f.detail ? <em>{f.detail}</em> : null}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

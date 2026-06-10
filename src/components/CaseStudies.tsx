import { FlowDiagram, type FlowStep } from './FlowDiagram';

interface CaseStudy {
  idx: string;
  title: string;
  body: string;
  impact: string;
  tags: string[];
  flowTitle: string;
  flow: FlowStep[];
}

const CASES: CaseStudy[] = [
  {
    idx: '01 — Fleet Platform',
    title: 'Real-time fleet management platform',
    body: 'Technical delivery of a production GPS-tracking platform: live command center, trip history playback, geofencing, alerting, and operational reports for fleets in the field — from device ingestion to the screens dispatchers watch all day.',
    impact: 'One FMS initiative alone: estimated ~IDR 300M efficiency gain from a single-user baseline.',
    tags: ['Java · Spring Boot', 'React', 'WebSocket', 'PostgreSQL', 'Docker', 'Jenkins'],
    flowTitle: 'Telemetry → decision flow',
    flow: [
      { label: 'GPS / IoT devices', detail: 'thousands of trackers reporting position, ignition, sensors' },
      { label: 'Ingestion & event pipeline', detail: 'normalize, enrich, detect trips, parking, violations' },
      { label: 'Live command center', detail: 'WebSocket map, playback, alert monitoring for dispatchers' },
      { label: 'Reports & alerts', detail: 'trip, speed, geofence, maintenance — delivered where ops live' },
    ],
  },
  {
    idx: '02 — AI Safety',
    title: 'AI driver-fatigue monitoring',
    body: 'Computer-vision service that turns dashcam clips into safety signals: eye-closure and yawning detection scored by inference models, returned to the fleet platform as alert evidence ops teams can act on in near-real-time.',
    impact: 'Fatigue events become reviewable evidence in minutes, not end-of-day reports.',
    tags: ['Python · FastAPI', 'PyTorch', 'OpenCV', 'YOLO', 'CUDA', 'WebSocket'],
    flowTitle: 'Clip → alert flow',
    flow: [
      { label: 'In-cab dashcam', detail: 'event-triggered video clips from the vehicle' },
      { label: 'CV inference', detail: 'eye-closure & yawn models score each clip' },
      { label: 'Confidence gate', detail: 'thresholds separate noise from genuine fatigue' },
      { label: 'Ops alert + evidence', detail: 'scored clip attached to the alert dispatchers see' },
    ],
  },
  {
    idx: '03 — Integrations',
    title: 'National-scale logistics integrations',
    body: 'Compliance reporting and BI pipelines for last-mile logistics at national scale (incl. SPX): fleet telemetry enriched and streamed into analytics stores, compliance engines, and partner APIs — the plumbing behind the metrics above.',
    impact: 'Up to 50% faster report processing · 400% faster monitoring deliverables · >90% forecast accuracy supported.',
    tags: ['Java', 'Python', 'MQTT', 'ClickHouse', 'MySQL · PostgreSQL', 'Kafka'],
    flowTitle: 'Telemetry → partner flow',
    flow: [
      { label: 'Fleet telemetry', detail: 'positions & events from the tracking platform' },
      { label: 'Enrichment', detail: 'business context: hubs, schedules, compliance rules' },
      { label: 'Analytics store', detail: 'columnar warehouse feeding BI and forecasting' },
      { label: 'Compliance & partner APIs', detail: 'scheduled delivery into client systems' },
    ],
  },
  {
    idx: '04 — Heavy Industry',
    title: 'Mining payload & productivity monitoring',
    body: 'Tablet-based payload monitoring for mining operations: rugged Android apps on excavators parsing industrial sensor buses, syncing over patchy networks, and feeding productivity reports — built for sites where connectivity is a luxury.',
    impact: 'Offline-first by necessity: the field does not wait for signal.',
    tags: ['Kotlin', 'Android · Compose', 'RS485', 'MQTT', 'Room · WorkManager'],
    flowTitle: 'Sensor → report flow',
    flow: [
      { label: 'Excavator sensors', detail: 'payload & work-status over industrial RS485' },
      { label: 'Rugged tablet app', detail: 'parse, persist offline, guide the operator' },
      { label: 'Opportunistic sync', detail: 'queue & push when the network shows up' },
      { label: 'Productivity reports', detail: 'payload truth for planning and billing' },
    ],
  },
];

export function CaseStudies() {
  return (
    <section className="section" id="work" aria-labelledby="work-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="num">01</span>
          <h2 id="work-heading">
            Selected <em>work</em>
          </h2>
        </div>
        <p className="eyebrow reveal" style={{ marginBottom: '1rem' }}>
          Production systems at Lacak.io — shown as architecture, not source. Client internals stay private.
        </p>
        {CASES.map((c) => (
          <article className="case" key={c.idx}>
            <div className="reveal">
              <span className="idx">{c.idx}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <p className="impact">{c.impact}</p>
              <ul className="tags">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <FlowDiagram title={c.flowTitle} steps={c.flow} />
          </article>
        ))}
      </div>
    </section>
  );
}

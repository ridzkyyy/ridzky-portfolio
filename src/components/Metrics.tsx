const METRICS = [
  { value: '~IDR 300M', label: 'estimated efficiency gain from one FMS initiative' },
  { value: '50%', label: 'faster report processing via API & BI automation' },
  { value: '400%', label: 'faster facility-expansion monitoring deliverables' },
  { value: '>90%', label: 'order forecasting accuracy supported' },
  { value: '>85%', label: 'engagement on near-real-time SLA dashboards' },
];

export function Metrics() {
  return (
    <section aria-label="Impact metrics" className="wrap">
      <div className="metrics reveal">
        {METRICS.map((m) => (
          <div className="metric" key={m.value}>
            <b>{m.value}</b>
            <span>{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

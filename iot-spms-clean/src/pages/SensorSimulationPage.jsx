import ZoneCard from "../components/ZoneCard.jsx";

export default function SensorSimulationPage({ zones, alerts, onOccupy, onRelease, onToggleGateway }) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>IoT Sensor Simulation</h1>
          <p className="muted">
            Simulate slot occupancy changes and gateway disconnection for the MVP demonstration.
          </p>
        </div>
      </div>

      <div className="zone-grid">
        {zones.map((zone) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
            onOccupy={onOccupy}
            onRelease={onRelease}
            onToggleGateway={onToggleGateway}
          />
        ))}
      </div>

      <div className="section-title"><h2>Device Alerts</h2></div>
      <div className="alert-list">
        {alerts.length === 0 ? (
          <div className="card"><p className="muted">No device alerts at the moment.</p></div>
        ) : alerts.map((alert) => (
          <article className="card alert-card" key={alert.id}>
            <strong>{alert.type}</strong>
            <p>{alert.message}</p>
            <small>{new Date(alert.time).toLocaleString()} | Zone {alert.zoneId} | {alert.severity}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

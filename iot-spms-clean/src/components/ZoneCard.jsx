import StatusBadge from "./StatusBadge.jsx";
import { getAvailableSlots, getZoneState } from "../services/mockIoTService.js";

export default function ZoneCard({ zone, onOccupy, onRelease, onToggleGateway }) {
  const state = getZoneState(zone);
  const available = getAvailableSlots(zone);

  return (
    <article className="card zone-card">
      <div className="card-row">
        <div>
          <h3>{zone.name}</h3>
          <p className="muted">Zone ID: {zone.id}</p>
        </div>
        <StatusBadge status={state} />
      </div>

      <div className="metric-grid">
        <div>
          <strong>{available}</strong>
          <span>Available</span>
        </div>
        <div>
          <strong>{zone.occupied}</strong>
          <span>Occupied</span>
        </div>
        <div>
          <strong>{zone.capacity}</strong>
          <span>Capacity</span>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${Math.min(100, (zone.occupied / zone.capacity) * 100)}%` }} />
      </div>

      <p className="muted">Gateway: <strong>{zone.gatewayStatus}</strong></p>

      {(onOccupy || onRelease || onToggleGateway) && (
        <div className="button-row">
          {onOccupy && <button className="btn small" onClick={() => onOccupy(zone.id)}>+ Occupy</button>}
          {onRelease && <button className="btn small secondary" onClick={() => onRelease(zone.id)}>- Release</button>}
          {onToggleGateway && <button className="btn small warning" onClick={() => onToggleGateway(zone.id)}>Toggle Gateway</button>}
        </div>
      )}
    </article>
  );
}

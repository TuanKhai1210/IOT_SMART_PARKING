import ZoneCard from "../components/ZoneCard.jsx";
import { getAvailableSlots, getZoneState } from "../services/mockIoTService.js";

export default function ParkingAvailabilityMap({ zones }) {
  const recommended = zones
    .filter((zone) => zone.gatewayStatus === "online" && getZoneState(zone) !== "Full")
    .sort((a, b) => getAvailableSlots(b) - getAvailableSlots(a))[0];

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Parking Availability Map</h1>
          <p className="muted">
            Availability is computed from the latest confirmed occupancy state.
          </p>
        </div>
        {recommended && (
          <div className="recommendation">
            Recommended: <strong>{recommended.name}</strong>
          </div>
        )}
      </div>

      <div className="zone-grid">
        {zones.map((zone) => <ZoneCard key={zone.id} zone={zone} />)}
      </div>
    </section>
  );
}

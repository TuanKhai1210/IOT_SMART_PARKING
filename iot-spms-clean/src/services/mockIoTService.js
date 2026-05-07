export function getZoneState(zone) {
  const ratio = zone.capacity === 0 ? 1 : zone.occupied / zone.capacity;
  if (zone.gatewayStatus !== "online") return "Warning";
  if (ratio >= 1) return "Full";
  if (ratio >= 0.8) return "Nearly Full";
  return "Available";
}

export function getAvailableSlots(zone) {
  return Math.max(0, zone.capacity - zone.occupied);
}

export function updateZoneOccupancy(zone, nextOccupied) {
  const bounded = Math.min(zone.capacity, Math.max(0, Number(nextOccupied)));
  return { ...zone, occupied: bounded };
}

export function toggleGateway(zone) {
  return {
    ...zone,
    gatewayStatus: zone.gatewayStatus === "online" ? "offline" : "online",
  };
}

export function buildDeviceAlert(zone) {
  if (zone.gatewayStatus === "online") return null;
  return {
    id: `A-${zone.id}-${Date.now()}`,
    zoneId: zone.id,
    severity: "High",
    type: "Gateway Disconnection",
    message: `${zone.name} gateway is offline. Latest confirmed state is preserved.`,
    time: new Date().toISOString(),
  };
}

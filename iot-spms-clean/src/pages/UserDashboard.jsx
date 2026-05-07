import PaymentStatusCard from "../components/PaymentStatusCard.jsx";
import SessionTable from "../components/SessionTable.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { getAvailableSlots, getZoneState } from "../services/mockIoTService.js";

export default function UserDashboard({ currentUser, zones, sessions, payments, setActivePage }) {
  const userSessions = sessions.filter((session) => session.userId === currentUser.id);
  const activeSession = userSessions.find((session) => session.status === "Active");
  const latestPayment = [...payments].reverse().find((payment) =>
    userSessions.some((session) => session.id === payment.sessionId)
  );

  const totalAvailable = zones.reduce((sum, zone) => sum + getAvailableSlots(zone), 0);
  const bestZone = zones
    .filter((zone) => getZoneState(zone) !== "Full" && zone.gatewayStatus === "online")
    .sort((a, b) => getAvailableSlots(b) - getAvailableSlots(a))[0];

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Parking User Dashboard</h1>
          <p className="muted">Welcome, {currentUser.name}. This dashboard summarizes your parking status.</p>
        </div>
        <button className="btn" onClick={() => setActivePage("availability")}>View Availability</button>
      </div>

      <div className="dashboard-grid">
        <article className="card">
          <h3>Active Session</h3>
          {activeSession ? (
            <>
              <StatusBadge status="Active" />
              <p><strong>Session:</strong> {activeSession.id}</p>
              <p><strong>Zone:</strong> {activeSession.zoneId}</p>
              <p className="muted">Entry: {new Date(activeSession.entryTime).toLocaleString()}</p>
            </>
          ) : (
            <>
              <StatusBadge status="No Active Session" />
              <p className="muted">You do not have an active parking session.</p>
            </>
          )}
        </article>

        <article className="card">
          <h3>Campus Availability</h3>
          <p className="big-number">{totalAvailable}</p>
          <p className="muted">Total available slots across all zones.</p>
          {bestZone && <p>Recommended zone: <strong>{bestZone.name}</strong></p>}
        </article>

        <PaymentStatusCard payment={latestPayment} />
      </div>

      <div className="section-title">
        <h2>Your Parking Sessions</h2>
      </div>
      <SessionTable sessions={userSessions} />
    </section>
  );
}

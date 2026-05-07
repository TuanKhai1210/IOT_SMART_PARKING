import ZoneCard from "../components/ZoneCard.jsx";
import SessionTable from "../components/SessionTable.jsx";
import LogTable from "../components/LogTable.jsx";

export default function OperatorDashboard({ zones, sessions, tickets, logs, alerts, setActivePage }) {
  const activeSessions = sessions.filter((session) => session.status === "Active");
  const activeTickets = tickets.filter((ticket) => ticket.status === "Active");

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Operator Monitoring Dashboard</h1>
          <p className="muted">Monitor occupancy, active sessions, tickets, and operational alerts.</p>
        </div>
        <div className="button-row">
          <button className="btn" onClick={() => setActivePage("sensor-simulation")}>Sensor Simulation</button>
          <button className="btn secondary" onClick={() => setActivePage("temporary-access")}>Issue Ticket</button>
        </div>
      </div>

      <div className="dashboard-grid three">
        <article className="card">
          <h3>Active Sessions</h3>
          <p className="big-number">{activeSessions.length}</p>
          <p className="muted">Current vehicles inside campus parking.</p>
        </article>
        <article className="card">
          <h3>Active Tickets</h3>
          <p className="big-number">{activeTickets.length}</p>
          <p className="muted">Temporary tickets currently active.</p>
        </article>
        <article className="card">
          <h3>Device Alerts</h3>
          <p className="big-number">{alerts.length}</p>
          <p className="muted">Faults or warnings generated from simulated IoT devices.</p>
        </article>
      </div>

      <div className="zone-grid compact">
        {zones.map((zone) => <ZoneCard key={zone.id} zone={zone} />)}
      </div>

      <div className="section-title"><h2>Active Sessions</h2></div>
      <SessionTable sessions={activeSessions} />

      <div className="section-title"><h2>Recent Logs</h2></div>
      <LogTable logs={logs.slice(0, 6)} />
    </section>
  );
}

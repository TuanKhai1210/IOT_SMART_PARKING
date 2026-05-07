import { useMemo, useState } from "react";
import LogTable from "../components/LogTable.jsx";
import SessionTable from "../components/SessionTable.jsx";

export default function AuditLogReportPage({ logs, sessions, payments, zones }) {
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredLogs = useMemo(() => {
    if (typeFilter === "All") return logs;
    return logs.filter((log) => log.type === typeFilter);
  }, [logs, typeFilter]);

  const totalCapacity = zones.reduce((sum, zone) => sum + zone.capacity, 0);
  const totalOccupied = zones.reduce((sum, zone) => sum + zone.occupied, 0);
  const paidRevenue = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const logTypes = ["All", ...Array.from(new Set(logs.map((log) => log.type)))];

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Audit Log and Report</h1>
          <p className="muted">Review traceable system events and simple operational indicators.</p>
        </div>
      </div>

      <div className="dashboard-grid three">
        <article className="card">
          <h3>Occupancy</h3>
          <p className="big-number">{totalOccupied}/{totalCapacity}</p>
          <p className="muted">Occupied slots across all zones.</p>
        </article>
        <article className="card">
          <h3>Sessions</h3>
          <p className="big-number">{sessions.length}</p>
          <p className="muted">Total session records in MVP state.</p>
        </article>
        <article className="card">
          <h3>Paid Revenue</h3>
          <p className="big-number">{paidRevenue.toLocaleString()}</p>
          <p className="muted">VND from paid mock payments.</p>
        </article>
      </div>

      <div className="card">
        <div className="card-row">
          <h3>Audit Logs</h3>
          <select className="input small-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            {logTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>
        <LogTable logs={filteredLogs} />
      </div>

      <div className="section-title"><h2>Session Records</h2></div>
      <SessionTable sessions={sessions} />
    </section>
  );
}

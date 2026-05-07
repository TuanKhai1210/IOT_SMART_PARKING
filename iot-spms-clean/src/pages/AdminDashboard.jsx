import LogTable from "../components/LogTable.jsx";

export default function AdminDashboard({ policies, logs, sessions, payments, setActivePage }) {
  const activeSessions = sessions.filter((session) => session.status === "Active").length;
  const totalRevenue = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="muted">Administrative overview for policy, report, and audit management.</p>
        </div>
        <div className="button-row">
          <button className="btn" onClick={() => setActivePage("pricing-policy")}>Configure Pricing</button>
          <button className="btn secondary" onClick={() => setActivePage("audit-log-report")}>View Reports</button>
        </div>
      </div>

      <div className="dashboard-grid three">
        <article className="card">
          <h3>Active Sessions</h3>
          <p className="big-number">{activeSessions}</p>
        </article>
        <article className="card">
          <h3>Active Policies</h3>
          <p className="big-number">{policies.filter((policy) => policy.active).length}</p>
        </article>
        <article className="card">
          <h3>Paid Revenue</h3>
          <p className="big-number">{totalRevenue.toLocaleString()}</p>
          <p className="muted">VND in MVP data</p>
        </article>
      </div>

      <div className="section-title"><h2>Recent Administrative and System Events</h2></div>
      <LogTable logs={logs.slice(0, 8)} />
    </section>
  );
}

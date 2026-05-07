import SessionTable from "../components/SessionTable.jsx";
import PaymentStatusCard from "../components/PaymentStatusCard.jsx";

export default function EntryExitPage({
  currentUser,
  zones,
  sessions,
  payments,
  onMemberEntry,
  onMemberExit,
  onUpdatePayment,
}) {
  const activeSession = sessions.find((session) => session.userId === currentUser.id && session.status === "Active");
  const userSessions = sessions.filter((session) => session.userId === currentUser.id);
  const latestPayment = [...payments].reverse().find((payment) =>
    userSessions.some((session) => session.id === payment.sessionId)
  );

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Parking Entry / Exit</h1>
          <p className="muted">Simulate a university-member entry and exit workflow.</p>
        </div>
      </div>

      <div className="dashboard-grid two">
        <article className="card">
          <h3>Member Entry</h3>
          <p className="muted">Create an active parking session for the current user.</p>
          <label>Preferred Zone</label>
          <select id="entry-zone" className="input">
            {zones.map((zone) => (
              <option value={zone.id} key={zone.id}>{zone.name}</option>
            ))}
          </select>
          <button
            className="btn full-width"
            onClick={() => onMemberEntry(document.getElementById("entry-zone").value)}
            disabled={Boolean(activeSession)}
          >
            Request Entry
          </button>
          {activeSession && <p className="hint">Entry is disabled because an active session already exists.</p>}
        </article>

        <article className="card">
          <h3>Member Exit</h3>
          <p className="muted">Validate active session, calculate fee, create mock BKPay payment, and close session.</p>
          <button
            className="btn full-width"
            onClick={() => onMemberExit()}
            disabled={!activeSession}
          >
            Request Exit
          </button>
          {!activeSession && <p className="hint">No active session available for exit.</p>}

          {latestPayment && (
            <div className="button-row mt">
              <button className="btn small" onClick={() => onUpdatePayment(latestPayment.id, "Paid")}>Mark Paid</button>
              <button className="btn small warning" onClick={() => onUpdatePayment(latestPayment.id, "Failed")}>Mark Failed</button>
            </div>
          )}
        </article>
      </div>

      <PaymentStatusCard payment={latestPayment} />

      <div className="section-title">
        <h2>Member Session History</h2>
      </div>
      <SessionTable sessions={userSessions} />
    </section>
  );
}

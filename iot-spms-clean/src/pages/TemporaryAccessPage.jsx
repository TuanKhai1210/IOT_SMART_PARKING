import { useState } from "react";
import SessionTable from "../components/SessionTable.jsx";

export default function TemporaryAccessPage({
  tickets,
  sessions,
  zones,
  onCreateTemporaryTicket,
  onTemporaryExit,
  onResolveLostTicket,
}) {
  const [form, setForm] = useState({
    visitorName: "Campus Visitor",
    vehicleInfo: "59-A1 12345",
    purpose: "Short campus visit",
    zoneId: zones[0]?.id || "A",
  });

  const temporarySessions = sessions.filter((session) => session.type === "temporary");

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Temporary Access</h1>
          <p className="muted">Issue temporary tickets for visitors or users without ID cards.</p>
        </div>
      </div>

      <div className="dashboard-grid two">
        <article className="card">
          <h3>Temporary Access Request</h3>
          <label>Visitor Name</label>
          <input className="input" value={form.visitorName} onChange={(e) => updateField("visitorName", e.target.value)} />

          <label>Vehicle Information</label>
          <input className="input" value={form.vehicleInfo} onChange={(e) => updateField("vehicleInfo", e.target.value)} />

          <label>Purpose</label>
          <input className="input" value={form.purpose} onChange={(e) => updateField("purpose", e.target.value)} />

          <label>Assigned Zone</label>
          <select className="input" value={form.zoneId} onChange={(e) => updateField("zoneId", e.target.value)}>
            {zones.map((zone) => <option key={zone.id} value={zone.id}>{zone.name}</option>)}
          </select>

          <button className="btn full-width" onClick={() => onCreateTemporaryTicket(form)}>
            Issue Temporary Ticket
          </button>
        </article>

        <article className="card">
          <h3>Active Temporary Tickets</h3>
          <div className="ticket-list">
            {tickets.length === 0 ? (
              <p className="muted">No temporary tickets issued.</p>
            ) : tickets.map((ticket) => (
              <div className="ticket" key={ticket.id}>
                <strong>{ticket.id}</strong>
                <span>{ticket.visitorName}</span>
                <small>{ticket.vehicleInfo}</small>
                <small>Status: {ticket.status}</small>
                <div className="button-row">
                  <button className="btn small" onClick={() => onTemporaryExit(ticket.id)}>Validate Exit</button>
                  <button className="btn small warning" onClick={() => onResolveLostTicket(ticket.id)}>Lost Ticket</button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="section-title">
        <h2>Temporary Sessions</h2>
      </div>
      <SessionTable sessions={temporarySessions} />
    </section>
  );
}

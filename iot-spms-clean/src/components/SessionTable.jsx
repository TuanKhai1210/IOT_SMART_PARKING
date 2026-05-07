export default function SessionTable({ sessions }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Session ID</th>
            <th>User</th>
            <th>Type</th>
            <th>Zone</th>
            <th>Entry Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 ? (
            <tr><td colSpan="6" className="empty">No sessions found.</td></tr>
          ) : sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.id}</td>
              <td>{session.userName}</td>
              <td>{session.type}</td>
              <td>{session.zoneId}</td>
              <td>{new Date(session.entryTime).toLocaleString()}</td>
              <td>{session.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

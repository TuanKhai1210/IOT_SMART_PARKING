export default function LogTable({ logs }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Actor</th>
            <th>Type</th>
            <th>Target</th>
            <th>Message</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr><td colSpan="6" className="empty">No logs found.</td></tr>
          ) : logs.map((log) => (
            <tr key={log.id}>
              <td>{new Date(log.time).toLocaleString()}</td>
              <td>{log.actor}</td>
              <td>{log.type}</td>
              <td>{log.target}</td>
              <td>{log.message}</td>
              <td>{log.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

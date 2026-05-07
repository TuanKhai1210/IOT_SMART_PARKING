export default function StatusBadge({ status }) {
  const normalized = String(status || "Unknown").replace(/\s+/g, "-").toLowerCase();
  return <span className={`status-badge status-${normalized}`}>{status || "Unknown"}</span>;
}

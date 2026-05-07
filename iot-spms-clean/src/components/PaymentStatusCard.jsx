import StatusBadge from "./StatusBadge.jsx";

export default function PaymentStatusCard({ payment }) {
  if (!payment) {
    return (
      <div className="card">
        <h3>Payment Status</h3>
        <p className="muted">No payment request has been generated yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-row">
        <h3>Payment Status</h3>
        <StatusBadge status={payment.status} />
      </div>
      <p><strong>Payment ID:</strong> {payment.id}</p>
      <p><strong>Session ID:</strong> {payment.sessionId}</p>
      <p><strong>Amount:</strong> {payment.amount.toLocaleString()} VND</p>
      <p className="muted">Updated: {new Date(payment.updatedAt).toLocaleString()}</p>
    </div>
  );
}

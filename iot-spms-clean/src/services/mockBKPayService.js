export function createPaymentRequest({ sessionId, amount }) {
  return {
    id: `P-${Date.now()}`,
    sessionId,
    amount,
    status: amount > 0 ? "Pending" : "Paid",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function updatePaymentStatus(payment, status) {
  return {
    ...payment,
    status,
    updatedAt: new Date().toISOString(),
  };
}

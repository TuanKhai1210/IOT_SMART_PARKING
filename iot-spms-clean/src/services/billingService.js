const MS_PER_HOUR = 1000 * 60 * 60;

export function calculateDurationHours(entryTime, exitTime = new Date().toISOString()) {
  const start = new Date(entryTime).getTime();
  const end = new Date(exitTime).getTime();
  const hours = Math.max(1, Math.ceil((end - start) / MS_PER_HOUR));
  return Number.isFinite(hours) ? hours : 1;
}

export function calculateFee(session, policies) {
  const policy = policies.find((item) => item.userType === session.type && item.active);
  const duration = calculateDurationHours(session.entryTime);

  if (!policy) {
    return {
      amount: 0,
      durationHours: duration,
      paymentRequired: false,
      note: "No active policy found. Fee waived for MVP.",
    };
  }

  const amount = policy.baseFee + Math.max(0, duration - 1) * policy.hourlyRate;
  return {
    amount,
    durationHours: duration,
    paymentRequired: amount > 0,
    note: `Applied policy: ${policy.name}`,
  };
}

export function createMemberSession({ user, zoneId }) {
  return {
    id: `S-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    type: "member",
    zoneId,
    entryTime: new Date().toISOString(),
    exitTime: null,
    status: "Active",
    paymentId: null,
  };
}

export function createTemporarySession({ ticket, zoneId }) {
  return {
    id: `S-${Date.now()}`,
    userId: ticket.id,
    userName: ticket.visitorName,
    type: "temporary",
    zoneId,
    entryTime: new Date().toISOString(),
    exitTime: null,
    status: "Active",
    paymentId: null,
  };
}

export function closeSession(session, paymentId = null) {
  return {
    ...session,
    exitTime: new Date().toISOString(),
    status: "Closed",
    paymentId,
  };
}

export function findActiveSession(sessions, userOrTicketId) {
  return sessions.find(
    (session) =>
      session.status === "Active" &&
      (session.userId === userOrTicketId || session.id === userOrTicketId)
  );
}

export function hasActiveSession(sessions, userId) {
  return sessions.some((session) => session.userId === userId && session.status === "Active");
}

export function createTemporaryTicket({ visitorName, vehicleInfo, purpose }) {
  return {
    id: `T-${Date.now()}`,
    visitorName,
    vehicleInfo,
    purpose,
    issuedTime: new Date().toISOString(),
    status: "Active",
  };
}

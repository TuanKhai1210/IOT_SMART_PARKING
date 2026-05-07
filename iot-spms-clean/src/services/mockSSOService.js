export function authenticateByRole(users, role) {
  const user = users.find((item) => item.role === role && item.status === "active");
  if (!user) {
    return { success: false, reason: "No active user found for this role." };
  }
  return { success: true, user };
}

export function authenticateByCard(users, cardId) {
  const user = users.find((item) => item.cardId === cardId && item.status === "active");
  if (!user) {
    return { success: false, reason: "Invalid or inactive card." };
  }
  return { success: true, user };
}

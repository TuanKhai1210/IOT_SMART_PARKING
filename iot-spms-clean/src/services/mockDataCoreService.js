export function getRoleData(user) {
  const privilegeMap = {
    learner: { canPark: true, billingMode: "cycle", discountRate: 0 },
    faculty: { canPark: true, billingMode: "perSession", discountRate: 0.5 },
    staff: { canPark: true, billingMode: "perSession", discountRate: 0.3 },
    operator: { canPark: false, canOperate: true },
    admin: { canPark: false, canAdminister: true },
  };

  return {
    userId: user?.id,
    role: user?.role,
    memberType: user?.memberType,
    ...privilegeMap[user?.role],
  };
}

export function canAccessParking(user) {
  return Boolean(getRoleData(user).canPark);
}

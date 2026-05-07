export function createLog({ actor = "System", type = "General", target = "-", message = "", result = "Success" }) {
  return {
    id: `L-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    time: new Date().toISOString(),
    actor,
    type,
    target,
    message,
    result,
  };
}

export function addLog(logs, payload) {
  return [createLog(payload), ...logs];
}

export default function Layout({ currentUser, activePage, setActivePage, onLogout, children }) {
  const userPages = [
    ["user-dashboard", "Dashboard"],
    ["availability", "Availability"],
    ["entry-exit", "Entry / Exit"],
    ["temporary-access", "Temporary Access"],
  ];

  const operatorPages = [
    ["operator-dashboard", "Operator Dashboard"],
    ["sensor-simulation", "Sensor Simulation"],
    ["temporary-access", "Temporary Access"],
    ["audit-log-report", "Logs / Reports"],
  ];

  const adminPages = [
    ["admin-dashboard", "Admin Dashboard"],
    ["pricing-policy", "Pricing Policy"],
    ["audit-log-report", "Logs / Reports"],
  ];

  let pages = userPages;
  if (currentUser?.role === "operator") pages = operatorPages;
  if (currentUser?.role === "admin") pages = adminPages;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">P</span>
          <div>
            <strong>IoT-SPMS</strong>
            <small>Smart Parking MVP</small>
          </div>
        </div>

        <div className="user-card">
          <strong>{currentUser?.name}</strong>
          <span>{currentUser?.memberType || currentUser?.role}</span>
        </div>

        <nav>
          {pages.map(([key, label]) => (
            <button
              key={key}
              className={activePage === key ? "nav-link active" : "nav-link"}
              onClick={() => setActivePage(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button className="btn secondary full-width" onClick={onLogout}>Logout</button>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  );
}

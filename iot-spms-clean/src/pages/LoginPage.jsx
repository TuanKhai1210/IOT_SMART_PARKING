import { authenticateByRole } from "../services/mockSSOService.js";

export default function LoginPage({ users, onLogin }) {
  const loginAs = (role) => {
    const result = authenticateByRole(users, role);
    if (result.success) onLogin(result.user);
    else alert(result.reason);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">P</div>
        <h1>IoT-SPMS</h1>
        <p className="muted">
          Smart Parking Management System for University Campus
        </p>

        <div className="login-grid">
          <button className="role-card" onClick={() => loginAs("learner")}>
            <strong>Parking User</strong>
            <span>University member entry, exit, availability, and payment.</span>
          </button>
          <button className="role-card" onClick={() => loginAs("operator")}>
            <strong>Parking Operator</strong>
            <span>Monitoring, temporary access, alerts, and exceptions.</span>
          </button>
          <button className="role-card" onClick={() => loginAs("admin")}>
            <strong>System Administrator</strong>
            <span>Pricing policies, reports, roles, and audit logs.</span>
          </button>
        </div>
      </section>
    </main>
  );
}

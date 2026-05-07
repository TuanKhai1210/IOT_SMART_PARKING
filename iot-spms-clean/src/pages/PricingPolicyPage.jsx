import { useState } from "react";

export default function PricingPolicyPage({ policies, onSavePolicy }) {
  const [form, setForm] = useState({
    id: `POL-${Date.now()}`,
    name: "New Parking Policy",
    userType: "member",
    baseFee: 3000,
    hourlyRate: 2000,
    active: true,
  });

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const submit = () => {
    if (!form.name.trim()) {
      alert("Policy name is required.");
      return;
    }
    onSavePolicy({
      ...form,
      baseFee: Number(form.baseFee),
      hourlyRate: Number(form.hourlyRate),
      id: form.id || `POL-${Date.now()}`,
    });
    setForm((prev) => ({ ...prev, id: `POL-${Date.now()}`, name: "New Parking Policy" }));
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Pricing Policy Configuration</h1>
          <p className="muted">Configure MVP pricing policies for member and temporary sessions.</p>
        </div>
      </div>

      <div className="dashboard-grid two">
        <article className="card">
          <h3>Policy Editor</h3>

          <label>Policy Name</label>
          <input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} />

          <label>User Type</label>
          <select className="input" value={form.userType} onChange={(e) => update("userType", e.target.value)}>
            <option value="member">University Member</option>
            <option value="temporary">Temporary Visitor</option>
          </select>

          <label>Base Fee (VND)</label>
          <input className="input" type="number" value={form.baseFee} onChange={(e) => update("baseFee", e.target.value)} />

          <label>Hourly Rate (VND)</label>
          <input className="input" type="number" value={form.hourlyRate} onChange={(e) => update("hourlyRate", e.target.value)} />

          <label className="checkbox-row">
            <input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} />
            Active policy
          </label>

          <button className="btn full-width" onClick={submit}>Save Policy</button>
        </article>

        <article className="card">
          <h3>Current Policies</h3>
          <div className="policy-list">
            {policies.map((policy) => (
              <div className="policy-item" key={policy.id}>
                <strong>{policy.name}</strong>
                <span>{policy.userType} | Base: {policy.baseFee.toLocaleString()} VND | Hourly: {policy.hourlyRate.toLocaleString()} VND</span>
                <small>{policy.active ? "Active" : "Inactive"}</small>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

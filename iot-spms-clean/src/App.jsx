import { useMemo, useState } from "react";

const ASSETS = {
  logoNameVi: "/assets/hcmut-logo-name-vi.png",
  logoNameEn: "/assets/hcmut-logo-name-en.png",
  logoMarkDark: "/assets/hcmut-logo-mark-dark.png",
  logoMarkLight: "/assets/hcmut-logo-mark-light.png",
  campusMap: "/assets/hcmut-campus-map.png",
};

const USERS = [
  {
    id: "2453347",
    name: "NGUYỄN LÊ QUANG TRỰC",
    role: "student",
    roleLabel: "Undergraduate Student",
    faculty: "Ho Chi Minh City University of Technology",
    major: "Computer Science and Engineering",
    type: "University Member",
  },
  {
    id: "2452515",
    name: "TẠ TUẤN KHẢI",
    role: "student",
    roleLabel: "Undergraduate Student",
    faculty: "Ho Chi Minh City University of Technology",
    major: "Computer Science and Engineering",
    type: "University Member",
  },
  {
    id: "GV001",
    name: "HCMUT FACULTY DEMO",
    role: "faculty",
    roleLabel: "Faculty Member",
    faculty: "Ho Chi Minh City University of Technology",
    major: "Academic Staff",
    type: "University Member",
  },
  {
    id: "CB001",
    name: "HCMUT STAFF DEMO",
    role: "staff",
    roleLabel: "Staff Member",
    faculty: "Ho Chi Minh City University of Technology",
    major: "Administrative Staff",
    type: "University Member",
  },
  {
    id: "TEMP-VISITOR",
    name: "TEMPORARY VISITOR",
    role: "visitor",
    roleLabel: "Temporary Visitor",
    faculty: "External Visitor",
    major: "No HCMUT account / No ID card",
    type: "Temporary User",
  },
  {
    id: "OPS",
    name: "PARKING OPERATOR",
    role: "operator",
    roleLabel: "Parking Operator",
    faculty: "Campus Operation Unit",
    major: "Parking Operation",
    type: "Ops Staff",
  },
  {
    id: "ADMIN-SPMS",
    name: "SYSTEM ADMINISTRATOR",
    role: "admin",
    roleLabel: "System Administrator",
    faculty: "System Administration",
    major: "IoT-SPMS Administration",
    type: "Ops Staff",
  },
];

const INITIAL_ZONES = [
  {
    id: "GATE-1",
    name: "Parking Area Gate 1",
    gateName: "Gate 1",
    location: "Main entrance area",
    address: "268 Ly Thuong Kiet Street, Dien Hong Ward, Ho Chi Minh City, Vietnam",
    capacity: 120,
    occupied: 78,
    allowedRoles: ["student", "faculty", "staff", "visitor"],
    deviceStatus: "Online",
    mapPoint: { x: 10, y: 72 },
    description:
      "General parking area for students, faculty members, staff members, and visitors.",
    parkingZones: [
      {
        id: "G1-ZA",
        name: "Zone G1-A",
        label: "Zone A",
        gateId: "GATE-1",
        capacity: 45,
        occupied: 26,
        sensorStatus: "Active",
        sensorNodes: makeDemoSensors("G1-ZA", 8, 5),
        mapPoint: { x: 30, y: 56 },
        guidanceNote: "Closest available zone from Gate 1.",
      },
      {
        id: "G1-ZB",
        name: "Zone G1-B",
        label: "Zone B",
        gateId: "GATE-1",
        capacity: 40,
        occupied: 28,
        sensorStatus: "Active",
        sensorNodes: makeDemoSensors("G1-ZB", 8, 4, [7], []),
        mapPoint: { x: 42, y: 68 },
        guidanceNote: "Secondary parking zone near the main entrance area.",
      },
      {
        id: "G1-ZC",
        name: "Zone G1-C",
        label: "Zone C",
        gateId: "GATE-1",
        capacity: 35,
        occupied: 24,
        sensorStatus: "Active",
        sensorNodes: makeDemoSensors("G1-ZC", 8, 3, [], [8]),
        mapPoint: { x: 50, y: 50 },
        guidanceNote: "Overflow zone for Gate 1 entry.",
      },
    ],
  },
  {
    id: "GATE-2",
    name: "Parking Area Gate 2",
    gateName: "Gate 2",
    location: "Faculty and staff restricted entrance",
    address: "10I1 To Hien Thanh Street, Quarter 9, Dien Hong Ward, Ho Chi Minh City, Vietnam",
    capacity: 70,
    occupied: 31,
    allowedRoles: ["faculty", "staff"],
    deviceStatus: "Online",
    mapPoint: { x: 54, y: 20 },
    description:
      "Restricted parking area for faculty members and university staff only.",
    parkingZones: [
      {
        id: "G2-ZA",
        name: "Zone G2-A",
        label: "Faculty Zone A",
        gateId: "GATE-2",
        capacity: 35,
        occupied: 16,
        sensorStatus: "Active",
        sensorNodes: makeDemoSensors("G2-ZA", 8, 4),
        mapPoint: { x: 66, y: 34 },
        guidanceNote: "Preferred faculty and staff parking zone.",
      },
      {
        id: "G2-ZB",
        name: "Zone G2-B",
        label: "Faculty Zone B",
        gateId: "GATE-2",
        capacity: 35,
        occupied: 15,
        sensorStatus: "Active",
        sensorNodes: makeDemoSensors("G2-ZB", 8, 3, [6], []),
        mapPoint: { x: 76, y: 46 },
        guidanceNote: "Secondary faculty and staff parking zone.",
      },
    ],
  },
  {
    id: "GATE-3",
    name: "Parking Area Gate 3",
    gateName: "Gate 3",
    location: "Secondary entrance area",
    address: "142 To Hien Thanh Street, Dien Hong Ward, Ho Chi Minh City, Vietnam",
    capacity: 100,
    occupied: 91,
    allowedRoles: ["student", "faculty", "staff", "visitor"],
    deviceStatus: "Online",
    mapPoint: { x: 88, y: 76 },
    description:
      "General parking area for students, faculty members, staff members, and visitors.",
    parkingZones: [
      {
        id: "G3-ZA",
        name: "Zone G3-A",
        label: "Zone D",
        gateId: "GATE-3",
        capacity: 45,
        occupied: 42,
        sensorStatus: "Active",
        sensorNodes: makeDemoSensors("G3-ZA", 8, 6),
        mapPoint: { x: 72, y: 64 },
        guidanceNote: "Closest parking zone from Gate 3.",
      },
      {
        id: "G3-ZB",
        name: "Zone G3-B",
        label: "Zone E",
        gateId: "GATE-3",
        capacity: 55,
        occupied: 49,
        sensorStatus: "Active",
        sensorNodes: makeDemoSensors("G3-ZB", 8, 5, [8], []),
        mapPoint: { x: 62, y: 82 },
        guidanceNote: "Overflow zone near the secondary entrance.",
      },
    ],
  },
];
const INITIAL_POLICIES = [
  { role: "student", label: "Student", fee: 3000, note: "Accumulated by parking session" },
  { role: "visitor", label: "Visitor", fee: 5000, note: "Paid per temporary parking session" },
  { role: "faculty", label: "Faculty Member", fee: 0, note: "Institutional privilege" },
  { role: "staff", label: "Staff Member", fee: 0, note: "Institutional privilege" },
];

function nowText() {
  return new Date().toLocaleString("vi-VN");
}

const OPERATING_HOURS = {
  startHour: 5,
  endHour: 21,
};


function makeDemoSensors(zoneId, total = 8, occupied = 0, maintenanceNumbers = [], faultNumbers = []) {
  return Array.from({ length: total }, (_, index) => {
    const sensorNumber = index + 1;
    const numberText = String(sensorNumber).padStart(2, "0");
    const operationalStatus = faultNumbers.includes(sensorNumber)
      ? "Fault"
      : maintenanceNumbers.includes(sensorNumber)
        ? "Maintenance"
        : "Active";

    return {
      id: `${zoneId}-S${numberText}`,
      name: `Sensor ${numberText}`,
      operationalStatus,
      slotStatus: index < occupied ? "Occupied" : "Empty",
      lastEvent: "Initial mock reading",
    };
  });
}

function getParkingZoneSensors(parkingZone) {
  return Array.isArray(parkingZone?.sensorNodes) ? parkingZone.sensorNodes : [];
}

function getSensorCounts(parkingZone) {
  const sensors = getParkingZoneSensors(parkingZone);
  return {
    total: sensors.length,
    active: sensors.filter((sensor) => sensor.operationalStatus === "Active").length,
    occupied: sensors.filter((sensor) => sensor.operationalStatus === "Active" && sensor.slotStatus === "Occupied").length,
    empty: sensors.filter((sensor) => sensor.operationalStatus === "Active" && sensor.slotStatus === "Empty").length,
    maintenance: sensors.filter((sensor) => sensor.operationalStatus === "Maintenance").length,
    fault: sensors.filter((sensor) => sensor.operationalStatus === "Fault").length,
  };
}

function deriveZoneSensorStatus(sensorNodes = []) {
  if (sensorNodes.some((sensor) => sensor.operationalStatus === "Fault")) return "Fault";
  if (sensorNodes.some((sensor) => sensor.operationalStatus === "Maintenance")) return "Maintenance";
  return "Active";
}

function sensorOperationalClass(status) {
  if (status === "Fault") return "status danger";
  if (status === "Maintenance") return "status warning";
  return "status available";
}

function sensorSlotClass(status) {
  if (status === "Occupied") return "status info";
  return "status available";
}

const ROLE_GROUPS = {
  UNIVERSITY_MEMBER: ["student", "faculty", "staff"],
  OPERATIONS: ["operator", "admin"],
};

const PAGE_ACCESS = {
  student: ["dashboard", "map", "entry"],
  faculty: ["dashboard", "map", "entry"],
  staff: ["dashboard", "map", "entry"],
  visitor: ["temporary", "map"],
  operator: ["dashboard", "map", "entry", "temporary", "operator", "sensors", "logs"],
  admin: ["dashboard", "map", "entry", "temporary", "operator", "sensors", "admin", "logs"],
};

function canAccessPage(user, pageKey) {
  return !!user && PAGE_ACCESS[user.role]?.includes(pageKey);
}

function hasAfterHoursOverride(user) {
  return ROLE_GROUPS.OPERATIONS.includes(user?.role);
}

function validateOperatingHours(user, actionName) {
  const operatingStatus = getOperatingStatus();

  if (operatingStatus.isOpen) {
    return {
      allowed: true,
      isOverride: false,
      message: operatingStatus.message,
    };
  }

  if (hasAfterHoursOverride(user)) {
    return {
      allowed: true,
      isOverride: true,
      message: `${operatingStatus.message} ${actionName} was allowed by operator/admin override.`,
    };
  }

  return {
    allowed: false,
    isOverride: false,
    message: `${operatingStatus.message} ${actionName} was rejected.`,
  };
}

function getOperatingStatus(date = new Date()) {
  const hour = date.getHours();

  if (hour < OPERATING_HOURS.startHour) {
    return {
      isOpen: false,
      code: "NOT_OPEN_YET",
      message:
        "Parking access is not available yet. Operating hours are 05:00 to 21:00.",
    };
  }

  if (hour >= OPERATING_HOURS.endHour) {
    return {
      isOpen: false,
      code: "CLOSED",
      message:
        "Parking access is closed for today. Operating hours are 05:00 to 21:00.",
    };
  }

  return {
    isOpen: true,
    code: "OPEN",
    message: "Parking access is available.",
  };
}

function makeId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function getOccupancyRatio(zone) {
  if (!zone.capacity || zone.capacity <= 0) return 0;
  return Math.min(zone.occupied / zone.capacity, 1);
}

function zoneStatus(zone) {
  const ratio = getOccupancyRatio(zone);

  if (ratio >= 1) return "Full";
  if (ratio >= 0.85) return "Nearly Full";
  return "Available";
}

function zoneStyle(zone) {
  const ratio = getOccupancyRatio(zone);

  const hue = 120 - ratio * 120;
  const bgLightness = 92 - ratio * 42;
  const borderLightness = 70 - ratio * 25;

  return {
    backgroundColor: `hsl(${hue}, 85%, ${bgLightness}%)`,
    border: `2px solid hsl(${hue}, 85%, ${borderLightness}%)`,
    color: ratio > 0.75 ? "#fff" : "#222"
  };
}

function progressStyle(zone) {
  const ratio = getOccupancyRatio(zone);
  const hue = 120 - ratio * 120;

  return {
    width: `${ratio * 100}%`,
    backgroundColor: `hsl(${hue}, 85%, 45%)`
  };
}

function statusClass(status) {
  if (status === "Available") return "status available";
  if (status === "Nearly Full") return "status warning";
  if (status === "Full") return "status danger";
  if (status === "Paid") return "status available";
  if (status === "Pending") return "status warning";
  if (status === "Failed") return "status danger";
  return "status neutral";
}

function isUniversityMember(user) {
  return !!user && ROLE_GROUPS.UNIVERSITY_MEMBER.includes(user.role);
}

function isOpsUser(user) {
  return !!user && ROLE_GROUPS.OPERATIONS.includes(user.role);
}

function isCurrentMonth(dateString) {
  if (!dateString) return false;

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();

  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function getPersonalMonthlyStats(user, sessions = [], payments = []) {
  if (!user) {
    return {
      entryCount: 0,
      totalCost: 0,
    };
  }

  const monthlySessions = sessions.filter(
    (s) => s.userId === user.id && isCurrentMonth(s.entryTime)
  );

  const monthlyPayments = payments.filter(
    (p) => p.userId === user.id && isCurrentMonth(p.createdAt)
  );

  const totalCost = monthlyPayments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  return {
    entryCount: monthlySessions.length,
    totalCost,
  };
}

function getSystemMonthlyStats(sessions = [], payments = []) {
  const monthlySessions = sessions.filter((s) =>
    isCurrentMonth(s.entryTime)
  );

  const monthlyPayments = payments.filter((p) =>
    isCurrentMonth(p.createdAt)
  );

  const totalRevenue = monthlyPayments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  return {
    totalEntries: monthlySessions.length,
    totalRevenue,
  };
}

function roleCanUseGate(role, zone) {
  return zone.allowedRoles.includes(role);
}

function getParkingZones(gate) {
  return Array.isArray(gate?.parkingZones) ? gate.parkingZones : [];
}

function getParkingZoneStatus(parkingZone) {
  if (parkingZone.sensorStatus === "Fault") return "Fault";
  if (parkingZone.sensorStatus === "Maintenance") return "Maintenance";

  const ratio = parkingZone.capacity > 0 ? parkingZone.occupied / parkingZone.capacity : 1;
  if (ratio >= 1) return "Full";
  if (ratio >= 0.85) return "Nearly Full";
  return "Active";
}

function getParkingZoneAvailable(parkingZone) {
  return Math.max(0, (parkingZone.capacity || 0) - (parkingZone.occupied || 0));
}

function summarizeGateDeviceStatus(parkingZones = []) {
  if (parkingZones.some((z) => z.sensorStatus === "Fault")) return "Fault";
  if (parkingZones.some((z) => z.sensorStatus === "Maintenance")) return "Maintenance";
  return "Online";
}

function recalculateGateFromParkingZones(gate) {
  const parkingZones = getParkingZones(gate);

  if (parkingZones.length === 0) return gate;

  const occupied = parkingZones.reduce((sum, z) => sum + Number(z.occupied || 0), 0);
  const capacity = parkingZones.reduce((sum, z) => sum + Number(z.capacity || 0), 0);

  return {
    ...gate,
    capacity,
    occupied,
    deviceStatus: summarizeGateDeviceStatus(parkingZones),
  };
}

function updateParkingZoneInGate(gate, parkingZoneId, updater) {
  const parkingZones = getParkingZones(gate).map((parkingZone) =>
    parkingZone.id === parkingZoneId ? updater(parkingZone) : parkingZone
  );

  return recalculateGateFromParkingZones({ ...gate, parkingZones });
}

function getBestEntryParkingZone(gate) {
  const candidates = getParkingZones(gate).filter(
    (parkingZone) =>
      parkingZone.sensorStatus === "Active" &&
      getParkingZoneAvailable(parkingZone) > 0
  );

  return candidates.sort(
    (a, b) => getParkingZoneAvailable(b) - getParkingZoneAvailable(a)
  )[0];
}

function getParkingZoneById(zones, gateId, parkingZoneId) {
  const gate = zones.find((zone) => zone.id === gateId);
  const parkingZone = getParkingZones(gate).find((zone) => zone.id === parkingZoneId);

  return { gate, parkingZone };
}

function getBestExitGate(activeSession, zones, user) {
  if (!activeSession) return null;

  const currentGate = zones.find((zone) => zone.id === activeSession.zoneId);

  if (currentGate && currentGate.deviceStatus === "Online") return currentGate;

  const allowedGates = zones.filter(
    (zone) => (roleCanUseGate(user.role, zone) || isOpsUser(user)) && zone.deviceStatus === "Online"
  );

  return allowedGates[0] || currentGate || null;
}

function createEntryGuidance(gate, parkingZone) {
  if (!gate || !parkingZone) return null;

  return {
    type: "entry",
    title: `Entry guidance: ${gate.gateName} to ${parkingZone.name}`,
    summary: `After entry approval, follow the highlighted route from ${gate.gateName} to ${parkingZone.name}.`,
    nodes: [
      { id: gate.id, label: gate.gateName, ...gate.mapPoint },
      { id: parkingZone.id, label: parkingZone.name, ...parkingZone.mapPoint },
    ],
    steps: [
      `Start from ${gate.gateName}.`,
      `Follow the blinking guidance line to ${parkingZone.name}.`,
      `Park in ${parkingZone.label}. Available slots: ${getParkingZoneAvailable(parkingZone)}.`,
    ],
  };
}

function createExitGuidance(activeSession, exitGate) {
  if (!activeSession || !exitGate) return null;

  const startNode = activeSession.targetParkingZonePoint || { x: 50, y: 50 };

  return {
    type: "exit",
    title: `Exit guidance: ${activeSession.targetParkingZoneName || activeSession.zoneName} to ${exitGate.gateName}`,
    summary: `For exit, follow the highlighted route to ${exitGate.gateName}.`,
    nodes: [
      {
        id: activeSession.targetParkingZoneId || activeSession.zoneId,
        label: activeSession.targetParkingZoneName || activeSession.zoneName,
        ...startNode,
      },
      { id: exitGate.id, label: exitGate.gateName, ...exitGate.mapPoint },
    ],
    steps: [
      `Start from ${activeSession.targetParkingZoneName || activeSession.zoneName}.`,
      `Follow the blinking exit line to ${exitGate.gateName}.`,
      `Complete exit through ${exitGate.gateName}.`,
    ],
  };
}

function estimateFee(session, policies) {
  const role = session.userRole || "visitor";
  const policy = policies.find((p) => p.role === role);
  const hourlyFee = policy ? Number(policy.fee) : 0;
  const started = new Date(session.entryTime);
  const minutes = Math.max(15, Math.round((Date.now() - started.getTime()) / 60000));
  const hours = Math.max(1, Math.ceil(minutes / 60));
  return hourlyFee * hours;
}

function HcmutLogo({ variant = "light", size = "normal" }) {
  const src = variant === "dark" ? ASSETS.logoMarkDark : ASSETS.logoMarkLight;

  return (
    <img
      className={`hcmut-logo-mark ${size}`}
      src={src}
      alt="HCMUT logo"
    />
  );
}

function HcmutNameLogo() {
  return (
    <img
      className="hcmut-name-logo"
      src={ASSETS.logoNameEn}
      alt="Vietnam National University Ho Chi Minh City - Ho Chi Minh City University of Technology"
    />
  );
}

function TopBar({ user, onLogout }) {
  return (
    <header className="topbar official-topbar">
      <div className="brand official-brand">
        <HcmutNameLogo />
        <div className="brand-divider" />
        <div>
          <h1>Smart Parking Management System</h1>
          <p>IoT-SPMS · Campus Parking Operation</p>
        </div>
      </div>

      {user && (
        <div className="topbar-user">
          <div>
            <strong>{user.name}</strong>
            <span>
              {user.id} · {user.roleLabel}
            </span>
          </div>
          <button className="btn outline-light" onClick={onLogout}>
            Log out
          </button>
        </div>
      )}
    </header>
  );
}

function LoginPage({ onLogin }) {
  const [selectedId, setSelectedId] = useState("2453347");
  const selectedUser = USERS.find((u) => u.id === selectedId);

  return (
    <div className="login-page">
      <div className="login-top official-login-top">
        <HcmutNameLogo />
        <div className="login-top-actions">
          <span>English (en)</span>
          <span>Log in</span>
        </div>
      </div>

      <div className="login-card official-login-card">
        <img
          className="login-card-mark"
          src={ASSETS.logoMarkLight}
          alt="HCMUT logo"
        />

        <h2>Log in using your account on:</h2>

        <button className="login-provider" type="button">
          <img
            className="provider-mark"
            src={ASSETS.logoMarkLight}
            alt="HCMUT"
          />
          <span>HCMUT account</span>
        </button>

        <div className="admin-login-label">Demo account</div>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {USERS.map((u) => (
            <option key={u.id} value={u.id}>
              {u.id} — {u.name} — {u.roleLabel}
            </option>
          ))}
        </select>

        <div className="login-preview">
          <p>
            <strong>Username:</strong> {selectedUser.id}
          </p>
          <p>
            <strong>Full name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Role:</strong> {selectedUser.roleLabel}
          </p>
          <p>
            <strong>Faculty:</strong> {selectedUser.faculty}
          </p>
        </div>

        <button
          className="btn primary full"
          onClick={() => onLogin(selectedUser)}
        >
          Continue
        </button>

        <div className="login-footer-row">
          <span>English (en)</span>
          <button className="cookie-btn">Cookies notice</button>
        </div>

        <div className="login-note">
          This MVP simulates HCMUT_SSO, HCMUT_DATACORE, BKPay, IoT sensors,
          signage, and gate controllers for academic demonstration.
        </div>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, user }) {
  const items = [
    ["dashboard", "Dashboard"],
    ["map", "Map & Availability"],
    ["entry", "Entry / Exit"],
    ["temporary", "Temporary Visitor"],
    ["operator", "Operator Dashboard"],
    ["sensors", "Sensor Simulation"],
    ["admin", "Admin & Policy"],
    ["logs", "Audit Logs / Reports"],
  ];

  const visible = items.filter(([key]) => canAccessPage(user, key));

  return (
    <aside className="sidebar">
      {visible.map(([key, label]) => (
        <button
          key={key}
          className={page === key ? "nav active" : "nav"}
          onClick={() => setPage(key)}
        >
          {label}
        </button>
      ))}
    </aside>
  );
}

function StatCard({ title, value, note }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h3>{value}</h3>
      <span>{note}</span>
    </div>
  );
}

function Dashboard({ user, zones = [], sessions = [], payments = [], setPage }) {
  if (!user) {
    return (
      <section>
        <div className="result-box">
          No user session was found. Please log in again.
        </div>
      </section>
    );
  }

  const activeSession = sessions.find(
    (s) => s.userId === user.id && s.status === "Active"
  );

  const availableCount = zones.reduce(
    (sum, z) => sum + ((z.capacity || 0) - (z.occupied || 0)),
    0
  );

  const personalStats = getPersonalMonthlyStats(user, sessions, payments);
  const systemStats = getSystemMonthlyStats(sessions, payments);

  const isOperatorOrAdmin = isOpsUser(user);

  const safeRoleLabel = user.roleLabel || "User";
  const safeName = user.name || "Unknown User";
  const safeId = user.id || "N/A";
  const safeMajor = user.major || "N/A";
  const safeType = user.type || "N/A";

  return (
    <section>
      <div className="hero">
        <div>
          <p className="eyebrow">HCMUT · Smart Campus Parking</p>
          <h2>Welcome, {safeName}</h2>
          <p>
            This MVP demonstrates access control, temporary access, IoT occupancy
            monitoring, parking guidance, billing, and audit logging for campus
            parking.
          </p>
        </div>

        <div className="student-card">
          <div className="student-card-head">
            <HcmutLogo variant="light" size="normal" />
            <div>
              <strong>{safeRoleLabel.toUpperCase()}</strong>
              <span>Simulated HCMUT parking profile</span>
            </div>
          </div>

          <h3>{safeName}</h3>
          <p>{safeRoleLabel}</p>

          <p>
            <strong>ID:</strong> {safeId}
          </p>

          <p>
            <strong>Major:</strong> {safeMajor}
          </p>

          <p>
            <strong>Valid until:</strong> 10/2028
          </p>
        </div>
      </div>

      {isOperatorOrAdmin ? (
        <div className="grid-4">
          <StatCard
            title="Available slots"
            value={availableCount}
            note="Across 3 campus gates"
          />

          <StatCard
            title="Monthly entries"
            value={systemStats.totalEntries}
            note="All users in current month"
          />

          <StatCard
            title="Monthly revenue"
            value={`${systemStats.totalRevenue.toLocaleString()} VND`}
            note="All paid sessions"
          />

          <StatCard
            title="User role"
            value={safeRoleLabel}
            note={safeType}
          />
        </div>
      ) : (
        <div className="grid-4">
          <StatCard
            title="Available slots"
            value={availableCount}
            note="Across 3 campus gates"
          />

          <StatCard
            title="My monthly entries"
            value={personalStats.entryCount}
            note="Current month"
          />

          <StatCard
            title="My monthly cost"
            value={`${personalStats.totalCost.toLocaleString()} VND`}
            note="Current month"
          />

          <StatCard
            title="Active session"
            value={activeSession ? "Yes" : "No"}
            note={activeSession ? activeSession.zoneName : "No current session"}
          />
        </div>
      )}

      <div className="quick-actions">
        {isUniversityMember(user) && (
          <button className="btn primary" onClick={() => setPage("entry")}>
            Request Entry / Exit
          </button>
        )}

        {user.role === "visitor" && (
          <button className="btn primary" onClick={() => setPage("temporary")}>
            Request Temporary Access
          </button>
        )}

        <button className="btn secondary" onClick={() => setPage("map")}>
          View Parking Map
        </button>

        {isOperatorOrAdmin && (
          <button className="btn secondary" onClick={() => setPage("logs")}>
            View Audit Logs / Reports
          </button>
        )}
      </div>
    </section>
  );
}

function CampusMap({ zones }) {
  return (
    <div className="real-campus-map">
      <div className="map-stage">
        <img src={ASSETS.campusMap} alt="HCMUT campus map" />

        {zones.map((z) => (
          <div
            key={z.id}
            className={`map-gate-card map-${z.id.toLowerCase()}`}
            style={zoneStyle(z)}
          >
            <strong>{z.gateName}</strong>
            <span>
              {z.capacity - z.occupied}/{z.capacity} slots
            </span>
            <small>{zoneStatus(z)}</small>
            {z.id === "GATE-2" && (
              <small className="gate-role-note">Faculty / Staff only</small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GuidancePanel({ guidance }) {
  if (!guidance) return null;

  const routePoints = guidance.nodes.map((node) => `${node.x},${node.y}`).join(" ");

  return (
    <div className="guidance-panel">
      <div className="guidance-head">
        <div>
          <p className="eyebrow">Smart guidance</p>
          <h3>{guidance.title}</h3>
        </div>
        <span className={guidance.type === "entry" ? "status available" : "status warning"}>
          {guidance.type === "entry" ? "Entry route" : "Exit route"}
        </span>
      </div>

      <p className="guidance-summary">{guidance.summary}</p>

      <div className="guidance-map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Parking guidance route">
          <polyline className="guidance-route-line" points={routePoints} />
        </svg>

        {guidance.nodes.map((node, index) => (
          <div
            key={node.id}
            className={index === 0 ? "guidance-node start" : "guidance-node target"}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span>{index === 0 ? "Start" : "Target"}</span>
            <strong>{node.label}</strong>
          </div>
        ))}
      </div>

      <ol className="guidance-steps">
        {guidance.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

function MapPage({ zones }) {
  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Real-time availability</p>
          <h2>Campus Parking Map</h2>
        </div>
      </div>

      <CampusMap zones={zones} />

      <div className="zone-grid">
        {zones.map((z) => {
          const status = zoneStatus(z);

          return (
            <div key={z.id} className="zone-card" style={zoneStyle(z)}>
              <div className="zone-card-head">
                <h3>{z.name}</h3>
                <span className={statusClass(status)}>{status}</span>
              </div>

              <div className="zone-meta">
                <p className="zone-location">{z.location}</p>

                <div className="zone-address-block">
                  <span>Address</span>
                  <p>{z.address}</p>
                </div>
              </div>

              <div className="progress">
                <div style={progressStyle(z)} />
              </div>

              <div className="zone-count-row">
                <p>
                  <strong>{z.capacity - z.occupied}</strong> available
                </p>
                <p>{z.capacity} total slots</p>
              </div>

              <p className="zone-description">{z.description}</p>

              <div className="zone-allowed-block">
                <span>Allowed roles</span>
                <p>{z.allowedRoles.join(", ")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EntryExitPage({ user, zones, setZones, sessions, setSessions, payments, setPayments, policies, addLog }) {
  const [selectedGate, setSelectedGate] = useState("GATE-1");
  const [message, setMessage] = useState("");
  const [guidance, setGuidance] = useState(null);
  const activeSession = sessions.find((s) => s.userId === user.id && s.status === "Active");

  function handleEntry() {
    const zone = zones.find((z) => z.id === selectedGate);

    if (!zone) {
      setMessage("Entry denied: selected gate was not found.");
      return;
    }

    const hoursCheck = validateOperatingHours(user, "Entry request");

    if (!hoursCheck.allowed) {
      setMessage(hoursCheck.message);
      setGuidance(null);
      addLog(user.id, "ENTRY_DENIED_OUT_OF_HOURS", zone.id, hoursCheck.message);
      return;
    }

    if (hoursCheck.isOverride) {
      addLog(user.id, "ENTRY_ALLOWED_AFTER_HOURS_OVERRIDE", zone.id, hoursCheck.message);
    }

    const status = zoneStatus(zone);

    const canUseSelectedGate = roleCanUseGate(user.role, zone) || isOpsUser(user);

    if (!canUseSelectedGate) {
      const msg = `${zone.gateName} is restricted to faculty and staff only.`;
      setMessage(msg);
      setGuidance(null);
      addLog(user.id, "ENTRY_DENIED", zone.id, msg);
      return;
    }

    if (status === "Full") {
      const msg = `${zone.gateName} is full. Please select another gate.`;
      setMessage(msg);
      setGuidance(null);
      addLog(user.id, "ENTRY_DENIED", zone.id, msg);
      return;
    }

    if (activeSession) {
      const msg = "Entry denied: user already has an active parking session.";
      setMessage(msg);
      setGuidance(null);
      addLog(user.id, "ENTRY_DENIED", activeSession.id, msg);
      return;
    }

    const targetParkingZone = getBestEntryParkingZone(zone);

    if (!targetParkingZone) {
      const msg = `${zone.gateName} has no active parking zone available. Please choose another gate.`;
      setMessage(msg);
      setGuidance(null);
      addLog(user.id, "ENTRY_DENIED_NO_ACTIVE_ZONE", zone.id, msg);
      return;
    }

    const session = {
      id: makeId("SES"),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      zoneId: zone.id,
      zoneName: zone.name,
      gateName: zone.gateName,
      targetParkingZoneId: targetParkingZone.id,
      targetParkingZoneName: targetParkingZone.name,
      targetParkingZonePoint: targetParkingZone.mapPoint,
      entryTime: new Date().toISOString(),
      exitTime: null,
      status: "Active",
      type: "Member",
    };

    setSessions((prev) => [session, ...prev]);

    setZones((prev) =>
      prev.map((z) =>
        z.id === zone.id
          ? updateParkingZoneInGate(z, targetParkingZone.id, (parkingZone) => ({
              ...parkingZone,
              occupied: Math.min(parkingZone.capacity, parkingZone.occupied + 1),
            }))
          : z
      )
    );

    const routeGuidance = createEntryGuidance(zone, targetParkingZone);
    const msg = `Entry approved at ${zone.gateName}. Recommended parking zone: ${targetParkingZone.name}. Session ${session.id} created.`;
    setMessage(msg);
    setGuidance(routeGuidance);
    addLog(user.id, "ENTRY_APPROVED", session.id, msg);
  }

  function handleExit() {
    if (!activeSession) {
      const msg = "Exit denied: no active parking session was found.";
      setMessage(msg);
      setGuidance(null);
      addLog(user.id, "EXIT_DENIED", user.id, msg);
      return;
    }

    const hoursCheck = validateOperatingHours(user, "Exit request");

    if (!hoursCheck.allowed) {
      setMessage(hoursCheck.message);
      setGuidance(null);
      addLog(user.id, "EXIT_DENIED_OUT_OF_HOURS", activeSession.id, hoursCheck.message);
      return;
    }

    if (hoursCheck.isOverride) {
      addLog(user.id, "EXIT_ALLOWED_AFTER_HOURS_OVERRIDE", activeSession.id, hoursCheck.message);
    }

    const amount = estimateFee(activeSession, policies);
    const payment = {
      id: makeId("PAY"),
      sessionId: activeSession.id,
      userId: user.id,
      amount,
      status: amount === 0 ? "Paid" : "Pending",
      createdAt: new Date().toISOString(),
    };

    const exitGate = getBestExitGate(activeSession, zones, user);
    const exitGuidance = createExitGuidance(activeSession, exitGate);

    setPayments((prev) => [payment, ...prev]);
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSession.id
          ? { ...s, status: "Closed", exitTime: new Date().toISOString(), paymentId: payment.id, exitGateId: exitGate?.id, exitGateName: exitGate?.gateName }
          : s
      )
    );

    setZones((prev) =>
      prev.map((z) =>
        z.id === activeSession.zoneId
          ? updateParkingZoneInGate(z, activeSession.targetParkingZoneId, (parkingZone) => ({
              ...parkingZone,
              occupied: Math.max(0, parkingZone.occupied - 1),
            }))
          : z
      )
    );

    const msg = `Exit completed via ${exitGate?.gateName || activeSession.gateName}. Fee: ${amount.toLocaleString()} VND. Payment status: ${payment.status}.`;
    setMessage(msg);
    setGuidance(exitGuidance);
    addLog(user.id, "EXIT_COMPLETED", activeSession.id, msg);
  }

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Access control</p>
          <h2>Entry / Exit Management</h2>
        </div>
      </div>

      <OperatingHoursNotice user={user} />
      <div className="two-col">
        <div className="panel">
          <h3>Request Parking Entry</h3>
          <label>Select Gate</label>
          <select value={selectedGate} onChange={(e) => setSelectedGate(e.target.value)}>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.gateName} — {z.name} — {zoneStatus(z)}
              </option>
            ))}
          </select>

          <div className="hint-box">
            <strong>Gate rule:</strong>
            <p>Gate 1 and Gate 3 allow students, faculty, staff, and visitors.</p>
            <p>Gate 2 is restricted to faculty members and university staff only.</p>
          </div>

          <button className="btn primary" onClick={handleEntry}>Approve Entry</button>
        </div>

        <div className="panel">
          <h3>Request Parking Exit</h3>
          {activeSession ? (
            <div className="session-box">
              <p><strong>Session:</strong> {activeSession.id}</p>
              <p><strong>Entry gate:</strong> {activeSession.gateName}</p>
              <p><strong>Assigned zone:</strong> {activeSession.targetParkingZoneName || activeSession.zoneName}</p>
              <p><strong>Entry time:</strong> {new Date(activeSession.entryTime).toLocaleString("vi-VN")}</p>
            </div>
          ) : (
            <p className="muted">No active parking session.</p>
          )}
          <button className="btn danger" onClick={handleExit}>Complete Exit</button>
        </div>
      </div>

      {message && <div className="result-box">{message}</div>}
      <GuidancePanel guidance={guidance} />
    </section>
  );
}

function TemporaryAccessPage({
  user,
  zones,
  setZones,
  sessions,
  setSessions,
  tickets,
  setTickets,
  payments,
  setPayments,
  policies,
  addLog,
}) {
  const [visitorName, setVisitorName] = useState(
    user.role === "visitor" ? "Temporary Visitor" : "Guest Visitor"
  );
  const [plate, setPlate] = useState("59-A1 000.00");
  const [gate, setGate] = useState("GATE-1");
  const [message, setMessage] = useState("");

  const activeTemporarySessions = sessions.filter(
    (s) =>
      s.type === "Temporary" &&
      s.status === "Active" &&
      (user.role !== "visitor" || s.createdBy === user.id)
  );

  function issueTicket() {
    const zone = zones.find((z) => z.id === gate);

    const hoursCheck = validateOperatingHours(user, "Temporary access request");

    if (!hoursCheck.allowed) {
      setMessage(hoursCheck.message);
      addLog(user.id, "TEMPORARY_ACCESS_DENIED_OUT_OF_HOURS", zone.id, hoursCheck.message);
      return;
    }

    if (hoursCheck.isOverride) {
      addLog(user.id, "TEMPORARY_ACCESS_ALLOWED_AFTER_HOURS_OVERRIDE", zone.id, hoursCheck.message);
    }

    if (!roleCanUseGate("visitor", zone)) {
      const msg = `${zone.gateName} is restricted. Visitors must use Gate 1 or Gate 3.`;
      setMessage(msg);
      addLog(user.id, "TEMPORARY_ACCESS_DENIED", zone.id, msg);
      return;
    }

    if (zoneStatus(zone) === "Full") {
      const msg = `${zone.gateName} is full. Temporary access denied.`;
      setMessage(msg);
      addLog(user.id, "TEMPORARY_ACCESS_DENIED", zone.id, msg);
      return;
    }

    const targetParkingZone = getBestEntryParkingZone(zone);

    if (!targetParkingZone) {
      const msg = `${zone.gateName} has no active parking zone available. Temporary access denied.`;
      setMessage(msg);
      addLog(user.id, "TEMPORARY_ACCESS_DENIED_NO_ACTIVE_ZONE", zone.id, msg);
      return;
    }

    const ticket = {
      id: makeId("TKT"),
      visitorName,
      plate,
      zoneId: zone.id,
      gateName: zone.gateName,
      targetParkingZoneId: targetParkingZone.id,
      targetParkingZoneName: targetParkingZone.name,
      status: "Active",
      issuedAt: new Date().toISOString(),
      createdBy: user.id,
    };

    const session = {
      id: makeId("TMP"),
      userId: ticket.id,
      userName: visitorName,
      userRole: "visitor",
      zoneId: zone.id,
      zoneName: zone.name,
      gateName: zone.gateName,
      targetParkingZoneId: targetParkingZone.id,
      targetParkingZoneName: targetParkingZone.name,
      targetParkingZonePoint: targetParkingZone.mapPoint,
      entryTime: new Date().toISOString(),
      exitTime: null,
      status: "Active",
      type: "Temporary",
      ticketId: ticket.id,
      createdBy: user.id,
    };

    setTickets((prev) => [ticket, ...prev]);
    setSessions((prev) => [session, ...prev]);
    setZones((prev) =>
      prev.map((z) =>
        z.id === zone.id
          ? updateParkingZoneInGate(z, targetParkingZone.id, (parkingZone) => ({
              ...parkingZone,
              occupied: Math.min(parkingZone.capacity, parkingZone.occupied + 1),
            }))
          : z
      )
    );

    const msg = `Temporary ticket ${ticket.id} issued for ${visitorName} at ${zone.gateName}. Recommended parking zone: ${targetParkingZone.name}.`;
    setMessage(msg);
    addLog(user.id, "TEMPORARY_TICKET_ISSUED", ticket.id, msg);
  }

  function payAndExit(session) {
    const hoursCheck = validateOperatingHours(user, "Temporary exit request");

    if (!hoursCheck.allowed) {
      setMessage(hoursCheck.message);
      addLog(user.id, "TEMPORARY_EXIT_DENIED_OUT_OF_HOURS", session.id, hoursCheck.message);
      return;
    }

    if (hoursCheck.isOverride) {
      addLog(user.id, "TEMPORARY_EXIT_ALLOWED_AFTER_HOURS_OVERRIDE", session.id, hoursCheck.message);
    }

    const ticket = tickets.find((t) => t.id === session.ticketId);
    const amount = estimateFee(session, policies);

    const payment = {
      id: makeId("PAY"),
      sessionId: session.id,
      userId: session.userId,
      amount,
      status: "Paid",
      createdAt: new Date().toISOString(),
    };

    setPayments((prev) => [payment, ...prev]);

    setSessions((prev) =>
      prev.map((s) =>
        s.id === session.id
          ? {
              ...s,
              status: "Closed",
              exitTime: new Date().toISOString(),
              paymentId: payment.id,
            }
          : s
      )
    );

    setTickets((prev) =>
      prev.map((t) =>
        t.id === session.ticketId ? { ...t, status: "Closed" } : t
      )
    );

    setZones((prev) =>
      prev.map((z) =>
        z.id === session.zoneId
          ? updateParkingZoneInGate(z, session.targetParkingZoneId, (parkingZone) => ({
              ...parkingZone,
              occupied: Math.max(0, parkingZone.occupied - 1),
            }))
          : z
      )
    );

    const msg = `Visitor paid ${amount.toLocaleString()} VND and exited successfully. Ticket ${ticket?.id || session.ticketId} closed.`;
    setMessage(msg);
    addLog(user.id, "VISITOR_PAID_AND_EXITED", session.id, msg);
  }

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Temporary visitor support</p>
          <h2>Temporary Access</h2>
        </div>
      </div>

      <OperatingHoursNotice user={user} />
      <div className="two-col">
        <div className="panel">
          <h3>Issue Temporary Ticket</h3>

          <label>Visitor name</label>
          <input
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
          />

          <label>Vehicle plate</label>
          <input value={plate} onChange={(e) => setPlate(e.target.value)} />

          <label>Gate</label>
          <select value={gate} onChange={(e) => setGate(e.target.value)}>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.gateName} — {z.name} — {zoneStatus(z)}
              </option>
            ))}
          </select>

          <div className="hint-box">
            <strong>Temporary visitor rule:</strong>
            <p>Visitors can use Gate 1 or Gate 3 only.</p>
            <p>Gate 2 is restricted to faculty members and university staff.</p>
          </div>

          <button className="btn primary" onClick={issueTicket}>
            Issue Temporary Ticket
          </button>
        </div>

        <div className="panel">
          <h3>Active Temporary Sessions</h3>

          {activeTemporarySessions.length === 0 ? (
            <p className="muted">No active temporary session.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Ticket</th>
                    <th>Visitor</th>
                    <th>Gate</th>
                    <th>Fee</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTemporarySessions.map((s) => {
                    const fee = estimateFee(s, policies);
                    return (
                      <tr key={s.id}>
                        <td>{s.ticketId}</td>
                        <td>{s.userName}</td>
                        <td>{s.gateName}</td>
                        <td>{fee.toLocaleString()} VND</td>
                        <td>
                          <button
                            className="btn primary compact"
                            onClick={() => payAndExit(s)}
                          >
                            Pay and Exit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <h3>Issued Tickets</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Visitor</th>
                  <th>Plate</th>
                  <th>Gate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets
                  .filter((t) => user.role !== "visitor" || t.createdBy === user.id)
                  .map((t) => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.visitorName}</td>
                      <td>{t.plate}</td>
                      <td>{t.gateName}</td>
                      <td>
                        <span className={statusClass(t.status)}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {message && <div className="result-box">{message}</div>}
    </section>
  );
}

function OperatorDashboard({ zones, sessions, tickets, alerts }) {
  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Operations</p>
          <h2>Operator Monitoring Dashboard</h2>
        </div>
      </div>

      <div className="grid-3">
        {zones.map((z) => (
          <StatCard
            key={z.id}
            title={z.gateName}
            value={zoneStatus(z)}
            note={`${z.occupied}/${z.capacity} occupied`}
          />
        ))}
      </div>

      <div className="two-col">
        <div className="panel">
          <h3>Active Sessions</h3>
          <DataTable
            rows={sessions.filter((s) => s.status === "Active")}
            columns={["id", "userName", "gateName", "type", "status"]}
          />
        </div>

        <div className="panel">
          <h3>Device Alerts</h3>
          {alerts.filter((a) => a.status === "Active").length === 0 ? (
            <p className="muted">No active device alerts.</p>
          ) : (
            <ul className="alert-list">
              {alerts
                .filter((a) => a.status === "Active")
                .map((a) => (
                  <li key={a.id}>
                    <strong>{a.title}</strong>
                    <span>{a.message}</span>
                    <span>{a.createdAt}</span>
                  </li>
                ))}
            </ul>
          )}

          <h3>Temporary Tickets</h3>
          <DataTable rows={tickets} columns={["id", "visitorName", "plate", "gateName", "status"]} />
        </div>
      </div>
    </section>
  );
}

function SensorSimulationPage({ zones, setZones, alerts, setAlerts, addLog }) {
  const [selectedGateId, setSelectedGateId] = useState(zones[0]?.id || "GATE-1");
  const selectedGate = zones.find((zone) => zone.id === selectedGateId) || zones[0];
  const parkingZones = getParkingZones(selectedGate);
  const [selectedParkingZoneId, setSelectedParkingZoneId] = useState(parkingZones[0]?.id || "");
  const selectedParkingZone =
    parkingZones.find((zone) => zone.id === selectedParkingZoneId) || parkingZones[0];
  const selectedSensors = getParkingZoneSensors(selectedParkingZone);
  const [selectedSensorId, setSelectedSensorId] = useState(selectedSensors[0]?.id || "");
  const selectedSensor =
    selectedSensors.find((sensor) => sensor.id === selectedSensorId) || selectedSensors[0];
  const selectedSensorCounts = getSensorCounts(selectedParkingZone);

  function handleGateChange(gateId) {
    const nextGate = zones.find((zone) => zone.id === gateId);
    const nextParkingZone = getParkingZones(nextGate)[0];
    const nextSensor = getParkingZoneSensors(nextParkingZone)[0];
    setSelectedGateId(gateId);
    setSelectedParkingZoneId(nextParkingZone?.id || "");
    setSelectedSensorId(nextSensor?.id || "");
  }

  function handleParkingZoneChange(parkingZoneId) {
    const nextParkingZone = parkingZones.find((zone) => zone.id === parkingZoneId);
    const nextSensor = getParkingZoneSensors(nextParkingZone)[0];
    setSelectedParkingZoneId(parkingZoneId);
    setSelectedSensorId(nextSensor?.id || "");
  }

  function updateSelectedParkingZone(updater, action, message) {
    if (!selectedGate || !selectedParkingZone) return;

    setZones((prev) =>
      prev.map((gate) =>
        gate.id === selectedGate.id
          ? updateParkingZoneInGate(gate, selectedParkingZone.id, updater)
          : gate
      )
    );

    addLog("IOT-GATEWAY", action, selectedParkingZone.id, message);
  }

  function updateSelectedSensor(sensorUpdater, action, message) {
    if (!selectedGate || !selectedParkingZone || !selectedSensor) return;

    updateSelectedParkingZone((parkingZone) => {
      const sensorNodes = getParkingZoneSensors(parkingZone).map((sensor) =>
        sensor.id === selectedSensor.id
          ? { ...sensorUpdater(sensor), lastEvent: message }
          : sensor
      );

      return {
        ...parkingZone,
        sensorNodes,
        sensorStatus: deriveZoneSensorStatus(sensorNodes),
      };
    }, action, message);
  }

  function freeSlot() {
    if (!selectedSensor) return;

    updateSelectedSensor(
      (sensor) => ({ ...sensor, operationalStatus: "Active", slotStatus: "Empty" }),
      "SENSOR_NODE_EMPTY",
      `${selectedSensor.id} in ${selectedParkingZone.name} is active and reports no vehicle.`
    );

    if (selectedSensor.slotStatus === "Occupied") {
      updateSelectedParkingZone(
        (parkingZone) => ({ ...parkingZone, occupied: Math.max(0, parkingZone.occupied - 1) }),
        "SENSOR_UPDATE_ZONE_FREE",
        `${selectedParkingZone.name} occupancy decreased by one slot.`
      );
    }
  }

  function occupySlot() {
    if (!selectedSensor) return;

    updateSelectedSensor(
      (sensor) => ({ ...sensor, operationalStatus: "Active", slotStatus: "Occupied" }),
      "SENSOR_NODE_OCCUPIED",
      `${selectedSensor.id} in ${selectedParkingZone.name} is active and reports a vehicle.`
    );

    if (selectedSensor.slotStatus === "Empty") {
      updateSelectedParkingZone(
        (parkingZone) => ({ ...parkingZone, occupied: Math.min(parkingZone.capacity, parkingZone.occupied + 1) }),
        "SENSOR_UPDATE_ZONE_OCCUPIED",
        `${selectedParkingZone.name} occupancy increased by one slot.`
      );
    }
  }

  function markFault() {
    if (!selectedGate || !selectedParkingZone || !selectedSensor) return;

    const alert = {
      id: makeId("ALT"),
      zoneId: selectedGate.id,
      parkingZoneId: selectedParkingZone.id,
      sensorId: selectedSensor.id,
      title: `${selectedSensor.id} sensor fault`,
      message: `Sensor fault detected at ${selectedSensor.id} in ${selectedParkingZone.name}. Latest confirmed availability is preserved.`,
      createdAt: nowText(),
      status: "Active",
    };

    setAlerts((prev) => [alert, ...prev]);

    updateSelectedSensor(
      (sensor) => ({ ...sensor, operationalStatus: "Fault" }),
      "SENSOR_NODE_FAULT",
      alert.message
    );
  }

  function markMaintenance() {
    if (!selectedSensor) return;

    updateSelectedSensor(
      (sensor) => ({ ...sensor, operationalStatus: "Maintenance" }),
      "SENSOR_NODE_MAINTENANCE",
      `${selectedSensor.id} in ${selectedParkingZone.name} marked as maintenance.`
    );
  }

  function recoverZone() {
    if (!selectedGate || !selectedParkingZone || !selectedSensor) return;

    updateSelectedSensor(
      (sensor) => ({ ...sensor, operationalStatus: "Active" }),
      "SENSOR_NODE_RECOVERED",
      `${selectedSensor.id} in ${selectedParkingZone.name} recovered and returned to active monitoring.`
    );

    setAlerts((prev) =>
      prev.map((alert) =>
        alert.sensorId === selectedSensor.id || alert.parkingZoneId === selectedParkingZone.id
          ? { ...alert, status: "Resolved" }
          : alert
      )
    );
  }

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">IoT simulation</p>
          <h2>Zone Sensor and Gateway Monitoring</h2>
        </div>
      </div>

      <div className="zone-grid">
        {zones.map((gate) => {
          const gateParkingZones = getParkingZones(gate);
          const activeCount = gateParkingZones.filter((zone) => zone.sensorStatus === "Active").length;
          const faultCount = gateParkingZones.filter((zone) => zone.sensorStatus === "Fault").length;
          const maintenanceCount = gateParkingZones.filter((zone) => zone.sensorStatus === "Maintenance").length;

          return (
            <button
              key={gate.id}
              type="button"
              className={selectedGateId === gate.id ? "sensor-gate-card selected" : "sensor-gate-card"}
              onClick={() => handleGateChange(gate.id)}
            >
              <div className="zone-card-head">
                <h3>{gate.gateName}</h3>
                <span className={gate.deviceStatus === "Fault" ? "status danger" : gate.deviceStatus === "Maintenance" ? "status warning" : "status available"}>
                  {gate.deviceStatus}
                </span>
              </div>
              <p>{gate.name}</p>
              <p><strong>{gate.capacity - gate.occupied}</strong> available / {gate.capacity} slots</p>
              <div className="sensor-summary-row">
                <span className="status available">Active {activeCount}</span>
                <span className="status danger">Fault {faultCount}</span>
                <span className="status warning">Maintenance {maintenanceCount}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="two-col">
        <div className="panel">
          <h3>Selected Gate and Zone</h3>

          <label>Gate</label>
          <select value={selectedGate?.id || ""} onChange={(e) => handleGateChange(e.target.value)}>
            {zones.map((gate) => (
              <option key={gate.id} value={gate.id}>
                {gate.gateName} — {gate.name} — {gate.deviceStatus}
              </option>
            ))}
          </select>

          <label>Parking zone</label>
          <select
            value={selectedParkingZone?.id || ""}
            onChange={(e) => handleParkingZoneChange(e.target.value)}
          >
            {parkingZones.map((parkingZone) => {
              const counts = getSensorCounts(parkingZone);
              return (
                <option key={parkingZone.id} value={parkingZone.id}>
                  {parkingZone.name} — {parkingZone.sensorStatus} — Empty {counts.empty} / Occupied {counts.occupied} / Maintenance {counts.maintenance}
                </option>
              );
            })}
          </select>

          {selectedParkingZone && (
            <div className="sensor-detail-card">
              <div className="zone-card-head">
                <h3>{selectedParkingZone.name}</h3>
                <span className={sensorOperationalClass(selectedParkingZone.sensorStatus)}>
                  {selectedParkingZone.sensorStatus}
                </span>
              </div>
              <p><strong>Gate:</strong> {selectedGate.gateName}</p>
              <p><strong>Occupied:</strong> {selectedParkingZone.occupied}/{selectedParkingZone.capacity}</p>
              <p><strong>Available:</strong> {getParkingZoneAvailable(selectedParkingZone)}</p>
              <p><strong>Status:</strong> {getParkingZoneStatus(selectedParkingZone)}</p>

              <div className="sensor-summary-row compact-summary">
                <span className="status available">Active {selectedSensorCounts.active}</span>
                <span className="status available">Empty {selectedSensorCounts.empty}</span>
                <span className="status info">Occupied {selectedSensorCounts.occupied}</span>
                <span className="status danger">Fault {selectedSensorCounts.fault}</span>
                <span className="status warning">Maintenance {selectedSensorCounts.maintenance}</span>
              </div>

              <label>Sensor node</label>
              <select
                value={selectedSensor?.id || ""}
                onChange={(e) => setSelectedSensorId(e.target.value)}
              >
                {selectedSensors.map((sensor) => (
                  <option key={sensor.id} value={sensor.id}>
                    {sensor.id} — {sensor.operationalStatus} — {sensor.slotStatus}
                  </option>
                ))}
              </select>

              {selectedSensor && (
                <div className="sensor-node-detail">
                  <div>
                    <span>Selected sensor</span>
                    <strong>{selectedSensor.id}</strong>
                  </div>
                  <span className={sensorOperationalClass(selectedSensor.operationalStatus)}>
                    {selectedSensor.operationalStatus}
                  </span>
                  <span className={sensorSlotClass(selectedSensor.slotStatus)}>
                    {selectedSensor.slotStatus}
                  </span>
                  <small>{selectedSensor.lastEvent}</small>
                </div>
              )}

              {selectedParkingZone.sensorStatus === "Fault" && (
                <div className="fault-box">
                  At least one sensor in this zone is faulty. Latest confirmed availability is preserved.
                </div>
              )}

              {selectedParkingZone.sensorStatus === "Maintenance" && (
                <div className="maintenance-box">
                  At least one sensor in this zone is under maintenance. Operator should avoid routing new users to the affected slot.
                </div>
              )}
            </div>
          )}

          <div className="button-row">
            <button className="btn secondary" onClick={freeSlot}>Set Empty</button>
            <button className="btn secondary" onClick={occupySlot}>Set Occupied</button>
            <button className="btn danger" onClick={markFault}>Fault</button>
            <button className="btn secondary" onClick={markMaintenance}>Maintenance</button>
            <button className="btn primary" onClick={recoverZone}>Recover</button>
          </div>
        </div>

        <div className="panel">
          <h3>Zones under {selectedGate?.gateName}</h3>
          <div className="sensor-zone-list">
            {parkingZones.map((parkingZone) => (
              <button
                type="button"
                key={parkingZone.id}
                className={selectedParkingZone?.id === parkingZone.id ? "sensor-zone-row selected" : "sensor-zone-row"}
                onClick={() => handleParkingZoneChange(parkingZone.id)}
              >
                <div>
                  <strong>{parkingZone.name}</strong>
                  <span>{parkingZone.guidanceNote}</span>
                </div>
                <span className={parkingZone.sensorStatus === "Fault" ? "status danger" : parkingZone.sensorStatus === "Maintenance" ? "status warning" : "status available"}>
                  {parkingZone.sensorStatus}
                </span>
                <span>{getParkingZoneAvailable(parkingZone)}/{parkingZone.capacity} available</span>
              </button>
            ))}
          </div>

          <h3>Sensor nodes in selected zone</h3>
          <div className="sensor-node-grid">
            {selectedSensors.map((sensor) => (
              <button
                type="button"
                key={sensor.id}
                className={selectedSensor?.id === sensor.id ? "sensor-node-card selected" : "sensor-node-card"}
                onClick={() => setSelectedSensorId(sensor.id)}
              >
                <strong>{sensor.name}</strong>
                <span>{sensor.id}</span>
                <span className={sensorOperationalClass(sensor.operationalStatus)}>
                  {sensor.operationalStatus}
                </span>
                <span className={sensorSlotClass(sensor.slotStatus)}>
                  {sensor.slotStatus}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Active / Resolved Alerts</h3>
        {alerts.length === 0 ? (
          <p className="muted">No device alerts.</p>
        ) : (
          <ul className="alert-list">
            {alerts.map((alert) => (
              <li key={alert.id}>
                <strong>{alert.title} — {alert.status}</strong>
                <span>{alert.message}</span>
                <span>{alert.createdAt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function AdminPage({ policies, setPolicies, addLog }) {
  const [selectedRole, setSelectedRole] = useState("student");
  const current = policies.find((p) => p.role === selectedRole);
  const [fee, setFee] = useState(current?.fee ?? 0);

  function savePolicy() {
    setPolicies((prev) => prev.map((p) => p.role === selectedRole ? { ...p, fee: Number(fee) } : p));
    addLog("ADMIN-SPMS", "POLICY_UPDATED", selectedRole, `Pricing policy for ${selectedRole} set to ${Number(fee).toLocaleString()} VND/hour.`);
  }

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Administration</p>
          <h2>Pricing Policy and Role Rules</h2>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <h3>Pricing Policy Configuration</h3>
          <label>User category</label>
          <select
            value={selectedRole}
            onChange={(e) => {
              const role = e.target.value;
              setSelectedRole(role);
              const policy = policies.find((p) => p.role === role);
              setFee(policy?.fee ?? 0);
            }}
          >
            {policies.map((p) => (
              <option key={p.role} value={p.role}>{p.label}</option>
            ))}
          </select>

          <label>Fee per hour, VND</label>
          <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} />

          <button className="btn primary" onClick={savePolicy}>Save Policy</button>
        </div>

        <div className="panel">
          <h3>Current Policies</h3>
          <DataTable rows={policies} columns={["label", "fee", "note"]} />
          <div className="hint-box">
            <strong>Gate privilege rule</strong>
            <p>Gate 2 is configured as a restricted gate for faculty members and university staff only.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogsPage({ logs, payments, sessions }) {
  const totalRevenue = payments.reduce((sum, p) => sum + (p.status !== "Failed" ? p.amount : 0), 0);

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Auditability</p>
          <h2>Audit Logs and Report</h2>
        </div>
      </div>

      <div className="grid-3">
        <StatCard title="Total sessions" value={sessions.length} note="Member and temporary sessions" />
        <StatCard title="Payment requests" value={payments.length} note="Mock BKPay requests" />
        <StatCard title="Estimated revenue" value={`${totalRevenue.toLocaleString()} VND`} note="Simulated financial summary" />
      </div>

      <div className="panel">
        <h3>Audit Log</h3>
        <DataTable rows={logs} columns={["time", "actor", "action", "target", "message"]} />
      </div>
    </section>
  );
}

function DataTable({ rows, columns }) {
  if (!rows || rows.length === 0) return <p className="muted">No data available.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((c) => (
                <td key={c}>{String(row[c] ?? "-")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [sessions, setSessions] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [payments, setPayments] = useState([]);
  const [policies, setPolicies] = useState(INITIAL_POLICIES);
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([
    {
      id: "LOG-INIT",
      time: nowText(),
      actor: "SYSTEM",
      action: "SYSTEM_STARTED",
      target: "IoT-SPMS",
      message: "MVP initialized with HCMUT-themed mock data.",
    },
  ]);

  function addLog(actor, action, target, message) {
    setLogs((prev) => [
      {
        id: makeId("LOG"),
        time: nowText(),
        actor,
        action,
        target,
        message,
      },
      ...prev,
    ]);
  }

  function handleLogin(selectedUser) {
    if (!selectedUser) {
      return;
    }

    setUser(selectedUser);
    setPage(selectedUser.role === "visitor" ? "temporary" : "dashboard");

    addLog(
      selectedUser.id || "UNKNOWN",
      "LOGIN",
      selectedUser.role || "unknown",
      `${selectedUser.name || "Unknown user"} logged in as ${
        selectedUser.roleLabel || "Unknown role"
      }.`
    );
  }

  function handleLogout() {
    if (user) addLog(user.id, "LOGOUT", user.role, `${user.name} logged out.`);
    setUser(null);
  }

  const content = useMemo(() => {
    if (!user) return null;

    if (page === "dashboard") {
      return <Dashboard user={user} zones={zones} sessions={sessions} payments={payments} setPage={setPage} />;
    }
    if (page === "map") return <MapPage zones={zones} />;
    if (page === "entry") {
      return (
        <EntryExitPage
          user={user}
          zones={zones}
          setZones={setZones}
          sessions={sessions}
          setSessions={setSessions}
          payments={payments}
          setPayments={setPayments}
          policies={policies}
          addLog={addLog}
        />
      );
    }
    if (page === "temporary") {
      return (
        <TemporaryAccessPage
          user={user}
          zones={zones}
          setZones={setZones}
          sessions={sessions}
          setSessions={setSessions}
          tickets={tickets}
          setTickets={setTickets}
          payments={payments}
          setPayments={setPayments}
          policies={policies}
          addLog={addLog}
        />
      );
    }
    if (page === "operator") return <OperatorDashboard zones={zones} sessions={sessions} tickets={tickets} alerts={alerts} />;
    if (page === "sensors") return <SensorSimulationPage zones={zones} setZones={setZones} alerts={alerts} setAlerts={setAlerts} addLog={addLog} />;
    if (page === "admin") return <AdminPage policies={policies} setPolicies={setPolicies} addLog={addLog} />;
    if (page === "logs") return <LogsPage logs={logs} payments={payments} sessions={sessions} />;

    return <Dashboard user={user} zones={zones} sessions={sessions} payments={payments} setPage={setPage} />;
  }, [user, page, zones, sessions, tickets, payments, policies, alerts, logs]);

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="app">
      <TopBar user={user} onLogout={handleLogout} />
      <div className="shell">
        <Sidebar page={page} setPage={setPage} user={user} />
        <main className="main-content">{content}</main>
      </div>
    </div>
  );
}

function OperatingHoursNotice({ user }) {
  const operatingStatus = getOperatingStatus();
  const canOverride = hasAfterHoursOverride(user);

  return (
    <div className={operatingStatus.isOpen ? "hint-box" : "fault-box"}>
      <strong>Operating hours:</strong>
      <p>
        05:00 to 21:00. Current status:{" "}
        {operatingStatus.isOpen ? "Open" : "Closed for normal access operations"}.
      </p>

      {!operatingStatus.isOpen && (
        <p>
          {canOverride
            ? "Operator/admin override is available. All override actions will be recorded in the audit log."
            : operatingStatus.message}
        </p>
      )}
    </div>
  );
}

export default App;


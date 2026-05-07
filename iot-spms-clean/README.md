# IoT-SPMS: IoT-based Smart Parking Management System for University Campus

## 1. Project Overview

IoT-SPMS is a Vite-based web prototype for an IoT-based Smart Parking Management System designed for a university campus. The prototype demonstrates the main software behaviors required in the final Software Engineering submission:

- role-based login
- parking user dashboard
- campus parking map and gate availability
- member entry and exit management
- duplicate-entry prevention
- role-based gate restriction
- temporary visitor ticket issuance
- temporary Pay and Exit
- operator monitoring dashboard
- sensor and gateway monitoring simulation
- occupancy update simulation
- device fault handling and recovery
- pricing policy configuration
- audit logs and reports

The system is a local demonstration prototype. It uses mock data and simulated services instead of real production integrations.

## 2. Team Members

| Student ID | Name | Role |
|---|---|---|
| 2452515 | Ta Tuan Khai | Undergraduate Student |
| 2453347 | Nguyen Le Quang Truc | Undergraduate Student |

## 3. Technology Stack

| Layer | Technology |
|---|---|
| Frontend runtime | Vite |
| UI library | React |
| Language | JavaScript, JSX |
| Styling | CSS |
| Data source | Local mock data inside the prototype |
| Diagram source | PlantUML files |

## 4. System Boundary

IoT-SPMS coordinates parking workflows inside the prototype. External systems and devices are simulated.

| External Component | Prototype Representation | Boundary Statement |
|---|---|---|
| HCMUT_SSO | Mock account selection | Real institutional authentication is not executed. |
| HCMUT_DATACORE | Mock user and role data | Institutional profile and role data are read-only in the target design. |
| BKPay | Simulated payment status | BKPay handles payment processing outside IoT-SPMS. The prototype records payment status only. |
| IoT Gateway | Operator-triggered sensor simulation | Real sensor streams are not connected. |
| Electronic Signage | UI-level guidance representation | Real signage hardware is not connected. |
| Gate Controller | UI-level gate action result | Real physical gate movement is not executed. |

## 5. Clean Folder Structure

```text
iot-spms-clean/
├── README.md
├── .gitignore
├── package.json
├── package-lock.json
├── index.html
├── public/
│   └── assets/
│       ├── hcmut-campus-map.png
│       ├── hcmut-logo-mark-dark.png
│       ├── hcmut-logo-mark-light.png
│       ├── hcmut-logo-name-en.png
│       └── hcmut-logo-name-vi.png
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   └── styles/
│       └── main.css
├── diagrams/
│   ├── 01_use_case_diagrams/
│   ├── 02_ui_flows/
│   ├── 03_sequence_diagrams/
│   ├── 04_activity_diagrams/
│   ├── 05_state_charts/
│   ├── 06_architecture_diagrams/
│   └── 07_class_diagrams/
├── docs/
│   ├── assets/
│   │   ├── demo_screenshots/
│   │   ├── exported_diagrams/
│   │   └── ui_mockups/
│   ├── references/
│   └── report/
├── tests/
└── scripts/
```

## 6. What Was Cleaned

The original submitted archive contained duplicated project folders and generated dependency/build folders. The cleaned structure applies these changes:

- removed the duplicate `New folder/` copy
- moved the Vite app from nested `mvp/` to the project root
- removed `node_modules/` from the submission package
- removed generated `dist/` from the submission package
- kept source code, public assets, diagrams, docs, tests, and scripts
- renamed diagram folders with numeric prefixes for easier report mapping
- added a complete root-level `README.md`

This structure is cleaner for GitHub, report submission, and local demonstration.

## 7. How to Run the Prototype

### 7.1 Prerequisites

Install Node.js and npm.

Recommended versions:

```bash
node -v
npm -v
```

A recent Node.js LTS version is recommended.

### 7.2 Install Dependencies

From the project root:

```bash
npm install
```

### 7.3 Run Development Server

```bash
npm run dev
```

After the server starts, open the Vite localhost URL shown in the terminal. The common default URL is:

```text
http://localhost:5173
```

### 7.4 Build for Preview

```bash
npm run build
npm run preview
```

Use this when you want to test the production build locally.

## 8. Demo Accounts

| Account | Display Name | Role | Main Demo Purpose |
|---|---|---|---|
| 2453347 | NGUYỄN LÊ QUANG TRỰC | Undergraduate Student | Parking user dashboard, map, entry, exit, payment status, restricted Gate 2 case. |
| 2452515 | TẠ TUẤN KHẢI | Undergraduate Student | Alternative student account. |
| GV001 | HCMUT FACULTY DEMO | Faculty Member | Faculty Gate 2 positive access case. |
| CB001 | HCMUT STAFF DEMO | Staff Member | Staff Gate 2 positive access case. |
| TEMP-VISITOR | TEMPORARY VISITOR | Temporary Visitor | Temporary ticket issuance, visitor Gate 2 restriction, Pay and Exit. |
| OPS | PARKING OPERATOR | Parking Operator | Operator dashboard, sensor monitoring, device fault handling, recovery, audit logs. |
| ADMIN-SPMS | SYSTEM ADMINISTRATOR | System Administrator | Pricing policy configuration, role-rule review, audit logs and reports. |

## 9. Recommended Demonstration Flow

Use this order when recording the final screen demonstration.

### 9.1 Parking User Flow

1. Open login screen.
2. Expand the account selector.
3. Select `2453347`.
4. Open the parking user dashboard.
5. Open campus parking map.
6. Open Entry / Exit Management.
7. Select Gate 1 and request entry.
8. Request entry again to show duplicate-entry rejection.
9. Complete exit to show fee and payment status.
10. Select Gate 2 to show student restriction.

### 9.2 Temporary Visitor Flow

1. Return to login.
2. Select `TEMP-VISITOR`.
3. Open Temporary Access screen.
4. Enter visitor name and vehicle plate.
5. Select Gate 2 and issue ticket to show rejection.
6. Select Gate 1 and issue ticket to show successful temporary ticket creation.
7. Click Pay and Exit to close the temporary session.

Suggested visitor data:

| Field | Value |
|---|---|
| Visitor name | Nguyen Van A |
| Vehicle plate | 51A-12345 |

### 9.3 Parking Operator Flow

1. Return to login.
2. Select `OPS`.
3. Open Operator Dashboard.
4. Open Sensor and Gateway Monitoring.
5. Trigger Occupy Slot or Free Slot.
6. Trigger Fault for a gate.
7. Trigger Recover for the same gate.
8. Open Audit Logs and Reports.

### 9.4 System Administrator Flow

1. Return to login.
2. Select `ADMIN-SPMS`.
3. Open Pricing Policy and Role Rules.
4. Review current policies and gate role rules.
5. Update a pricing policy.
6. Open Audit Logs and Reports to show administrative traceability.

### 9.5 Faculty Gate 2 Positive Case

1. Return to login.
2. Select `GV001`.
3. Open Entry / Exit Management.
4. Select Gate 2.
5. Request entry.
6. Confirm that Gate 2 entry is approved for the faculty role.

## 10. Feature Checklist

| Status | Feature |
|---|---|
| Done | Role-based login |
| Done | Parking user dashboard |
| Done | Campus parking map |
| Done | Member entry request |
| Done | Duplicate-entry rejection |
| Done | Member exit and payment-status display |
| Done | Student Gate 2 rejection |
| Done | Faculty Gate 2 approval |
| Done | Temporary visitor ticket issuance |
| Done | Temporary visitor Gate 2 rejection |
| Done | Temporary Pay and Exit |
| Done | Operator dashboard |
| Done | Occupancy update simulation |
| Done | Device fault handling |
| Done | Device recovery |
| Done | Pricing policy configuration |
| Done | Audit logs and reports |

## 11. Important Business Rules Represented

| Rule | Prototype Behavior |
|---|---|
| A user cannot have more than one active parking session. | Duplicate entry is rejected. |
| Gate 2 is restricted to faculty and staff. | Student and visitor access is rejected. Faculty access is approved. |
| Visitors may use Gate 1 or Gate 3 only. | Visitor Gate 2 request is rejected. |
| BKPay is outside IoT-SPMS. | The prototype records and displays payment status only. |
| Faulty device data must not corrupt availability. | The system preserves latest confirmed availability during fault state. |
| Critical events must be auditable. | Login, access, ticket, payment, device, recovery, and policy events appear in audit logs. |

## 12. Diagram Folders

| Folder | Content |
|---|---|
| `diagrams/01_use_case_diagrams/` | Whole-system and decomposed use-case diagrams. |
| `diagrams/02_ui_flows/` | Actor-based screen flow diagrams. |
| `diagrams/03_sequence_diagrams/` | Runtime sequence diagrams. |
| `diagrams/04_activity_diagrams/` | Workflow and decision diagrams. |
| `diagrams/05_state_charts/` | State diagrams for core lifecycle objects. |
| `diagrams/06_architecture_diagrams/` | Layered architecture, deployment view, development view. |
| `diagrams/07_class_diagrams/` | Domain, service, repository, and integration class diagrams. |

## 13. Report and Documentation Folders

| Folder | Purpose |
|---|---|
| `docs/report/` | Report section drafts and final-section placeholders. |
| `docs/references/` | Assignment notes, feedback notes, and bibliography placeholders. |
| `docs/assets/demo_screenshots/` | Demo screenshot evidence if included. |
| `docs/assets/exported_diagrams/` | Rendered diagram images. |
| `docs/assets/ui_mockups/` | UI mockup images. |
| `tests/` | Functional, non-functional, and traceability test-case documents. |
| `scripts/` | Notes for rendering diagrams and exporting report assets. |

## 14. Rendering PlantUML Diagrams

Install PlantUML or use a PlantUML extension in VS Code.

Example command with a local PlantUML jar:

```bash
java -jar plantuml.jar diagrams/01_use_case_diagrams/*.puml
```

Recommended export location:

```text
docs/assets/exported_diagrams/
```

## 15. Known Limitations

The prototype is designed for demonstration and report validation. It does not implement production infrastructure.

Current limitations:

- no real HCMUT_SSO login
- no real HCMUT_DATACORE API connection
- no real BKPay transaction
- no real IoT gateway connection
- no real electronic signage hardware
- no real gate controller hardware
- no production database
- data may reset after reload depending on implementation state

## 16. Troubleshooting

### `npm run dev` does not work

Run:

```bash
npm install
npm run dev
```

### Browser still shows old state

Clear browser storage for localhost:

1. Open DevTools.
2. Open Application tab.
3. Select Local Storage.
4. Clear storage for localhost.
5. Reload the page.

### Port 5173 is busy

Vite may start on another port. Use the URL shown in the terminal.

### Images do not load

Check that these files exist:

```text
public/assets/hcmut-campus-map.png
public/assets/hcmut-logo-mark-dark.png
public/assets/hcmut-logo-mark-light.png
public/assets/hcmut-logo-name-en.png
public/assets/hcmut-logo-name-vi.png
```

## 17. Final Submission Notes

This repository supports the final Software Engineering submission. The final PDF report should include:

- all contents from Submission 1
- all contents from Submission 2
- all contents from Submission 3
- working demonstration by sequence of screens
- clear Generative AI usage statement

The working demonstration should be recorded from the local Vite application and should follow the recommended demonstration flow in this README.

# MediReminder

A medication reminder app concept with two modes — **Patient Mode** and **Doctor Mode**. This repo currently contains **high-fidelity HTML/CSS/JS mockups** of the core screens, used as the design reference before building the real React app.

## 🟢 Live preview
Open `index.html` in a browser to see a clickable index of every screen, or open any file inside `/mockups` directly.

## Screens completed
| Screen | File |
|---|---|
| Login / Onboarding | `mockups/medreminder_login_onboarding.html` |
| Patient Home | `mockups/medreminder_patient_home.html` |
| Patient Progress | `mockups/medreminder_patient_progress.html` |
| Medicine Entry Form | `mockups/medreminder_medicine_entry_form.html` |
| Doctor Dashboard | `mockups/medreminder_doctor_dashboard.html` |
| Doctor → Patient Detail | `mockups/medreminder_doctor_patient_view.html` |
| Doctor Prescribing Flow | `mockups/medreminder_doctor_prescribe.html` |
| Add Patient Screen | `mockups/medreminder_add_patient.html` |

## Screens pending
All screens from the original spec are now built. Next milestone is converting these into the real React app (see below).

## Tech notes
- These are **static mockups**, not the production app. Each file is self-contained HTML/CSS/JS rendered inside a phone-frame.
- Tabler Icons are used throughout (`<i class="ti ti-...">`).
- Color system: Patient mode primary `#0d4f6e`, Doctor mode primary `#0b3a52`. See `CONTINUATION_PROMPT.md` for the full design system spec.
- `sendPrompt()` calls inside the mockups were originally used for screen-to-screen navigation inside the AI design tool — a no-op fallback is included so files don't error when opened standalone.

## Next steps
1. Convert all 8 mockups into real React components (React Router for navigation, component state for interactivity)
2. Wire up Firebase (auth, Firestore for patients/medicines/adherence logs)
3. Replace dummy data with live data
4. Connect the cross-screen flow so actions in one screen (e.g. saving a prescription) actually update state shown in another (e.g. patient home)

## Continuation prompt
`CONTINUATION_PROMPT.md` contains a ready-to-paste prompt + full design system spec for continuing this work in a new AI chat session if needed.

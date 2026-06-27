# MediReminder — Continuation Prompt

Paste this into a new chat (along with the attached reference HTML files) to keep building screens in the exact same visual style.

---

I'm building a medication reminder app called **MediReminder**. I already have several screens built as standalone HTML/CSS/JS mockups (phone-frame mockups, not a full React build yet — that comes later). I need you to **continue building the remaining screens in the exact same visual style**, matching every detail below. Do not redesign or restyle anything that already exists — only add new screens that match.

## Screens already built (attached as reference files)
1. `medreminder_patient_home.html` — Patient home: today's medicines grouped by Morning/Afternoon/Night, streak card, mark-as-taken buttons
2. `medreminder_patient_progress.html` — Patient adherence calendar + per-medicine progress bars
3. `medreminder_doctor_dashboard.html` — Doctor's patient list grouped by Critical / At risk / On track, with adherence bars
4. `medreminder_doctor_patient_view.html` — Doctor's detail view for one patient: alert banner, stats, calendar, missed-dose patterns, per-medicine trend bars
5. `medreminder_doctor_prescribe.html` — Doctor prescribing flow: select patient → add medicines → review → "magic moment" success overlay (prescription instantly synced to patient's app)
6. `medreminder_login_onboarding.html` — Onboarding slides → role select (Patient/Doctor) → phone login → OTP verify

## Design system (must match exactly)
- **Format:** each screen is a single self-contained HTML snippet with `<style>` + a `.phone` mockup div + `<script>` at the bottom. No external frameworks — plain HTML/CSS/JS.
- **Phone frame:** `.phone{width:320px;border-radius:36px;border:8px solid #1a2a3a;}` with a `.status` bar showing `9:41` and wifi/battery icons (Tabler Icons via `<i class="ti ti-...">`)
- **Color palette:**
  - Patient mode primary: `#0d4f6e` (topbar), `#0b3f58` (date strip), accents `#1a8fb4`, `#4dd0e1`
  - Doctor mode primary: `#0b3a52` (topbar), `#0d4f6e` (summary strip)
  - Success/green: `#2e7d32` / bg `#e8f5e9`
  - Warning/amber: `#f57f17` or `#e65100` / bg `#fff8e1` or `#fff3e0`
  - Critical/red: `#c62828` or `#b71c1c` / bg `#fdecea`
  - Neutral text: `#0b2a38` (headings), `#7090a0` (secondary), `#5a7f90` (labels)
  - Card background: `#fff`, border `#dde8f0`, page background `#f4f7fb`
- **Typography:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. Section labels are uppercase, 10-11px, bold, letter-spacing 0.06em, color `#5a7f90`.
- **Components reused across screens:** `.patient-card` / `.med-card` (white, rounded 13-14px, border `#dde8f0`), `.pill` (rounded badges, color variants `pill-blue/green/amber/red`), `.adh-bar-wrap`/`.progress-bar-fill` (rounded progress bars), `.chip` (rounded filter/option chips with `.active` state in topbar navy), `.bottom-nav` (4-item nav bar, active item colored), `.primary-btn`/`.cta-btn` (solid rounded button in the mode's primary color)
- **Icons:** Tabler Icons classes throughout, e.g. `ti ti-pill`, `ti ti-flame`, `ti ti-check`, `ti ti-alert-triangle`
- **Navigation between screens:** buttons call a global `sendPrompt(text)` function (already provided by the chat environment) to request the next screen, e.g. `onclick="sendPrompt('Build the Medicines list screen next')"`
- **Today's date in mockups:** use 27 June 2026 (Friday) as "today" for consistency with existing calendars/streaks

## What I need next
Please build: **[FILL IN — name the next screen, e.g. "Screen 7 — Add Patient screen (doctor enters patient name + phone number)"]**

Keep using dummy/realistic data consistent with the patients and medicines already used in the reference files (Rajesh Kumar, Suresh Krishnan, Meena Sharma, Anita Patel, Vijay Rao, Lakshmi Nair — and medicines Metformin, Amlodipine, Atorvastatin, etc.) unless the new screen needs new dummy data.

Build it as a single HTML file in the same format as the attached references, and present it to me as a file when done.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const days = [
  { dn: 'Mon', dd: '23' }, { dn: 'Tue', dd: '24' }, { dn: 'Wed', dd: '25' },
  { dn: 'Thu', dd: '26' }, { dn: 'Fri', dd: '27' }, { dn: 'Sat', dd: '28' }, { dn: 'Sun', dd: '29' }
]

const medicines = [
  { id: 1, name: 'Metformin', dose: '500mg · After food', time: '8:00 AM', food: 'After food', freq: 'Twice daily', section: 'Morning', taken: true },
  { id: 2, name: 'Metformin', dose: '500mg · After food', time: '2:00 PM', food: 'After food', freq: '', section: 'Afternoon', taken: false },
  { id: 3, name: 'Amlodipine', dose: '5mg · Before food', time: '9:00 PM', food: 'Before food', freq: 'Once daily', section: 'Night', taken: false },
  { id: 4, name: 'Atorvastatin', dose: '10mg · After food', time: '9:00 PM', food: 'After food', freq: 'Once daily', section: 'Night', taken: false },
]

export default function PatientHome() {
  const navigate = useNavigate()
  const [activeDay, setActiveDay] = useState(4)
  const [takenMap, setTakenMap] = useState({ 1: true })

  const toggleTaken = (id) => {
    setTakenMap(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const sections = ['Morning', 'Afternoon', 'Night']

  return (
    <div style={s.bg}>
      <div style={s.phone}>

        {/* Status bar */}
        <div style={s.status}>
          <span style={s.statusTime}>9:41</span>
          <span style={s.statusIcons}>📶 🔋</span>
        </div>

        {/* Top bar */}
        <div style={s.topbar}>
          <div style={s.topbarRow}>
            <div>
              <div style={s.greeting}>Good morning,</div>
              <div style={s.patientName}>Rajesh Kumar</div>
            </div>
            <button style={s.notifBtn}>🔔</button>
          </div>
        </div>

        {/* Date strip */}
        <div style={s.dateStrip}>
          <div style={s.dateLabel}>Today, 27 Jun 2026</div>
          <div style={s.weekRow}>
            {days.map((d, i) => (
              <div key={i} style={{ ...s.dayChip, ...(activeDay === i ? s.dayChipActive : {}) }} onClick={() => setActiveDay(i)}>
                <div style={{ ...s.dn, ...(activeDay === i ? s.dnActive : {}) }}>{d.dn}</div>
                <div style={{ ...s.dd, ...(activeDay === i ? s.ddActive : {}) }}>{d.dd}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll area */}
        <div style={s.scrollArea}>

          {/* Streak card */}
          <div style={s.streakCard}>
            <span style={{ fontSize: 24, color: '#ffd54f' }}>🔥</span>
            <div style={s.streakText}>
              <div style={s.streakNum}>Day 12</div>
              <div style={s.streakSub}>Current streak</div>
            </div>
            <div style={s.streakRight}>
              <div style={s.streakPct}>94%</div>
              <div style={s.streakPctLabel}>This month</div>
            </div>
          </div>

          {sections.map(section => {
            const meds = medicines.filter(m => m.section === section)
            if (!meds.length) return null
            return (
              <div key={section}>
                <div style={s.sectionLabel}>{section}</div>
                {meds.map(med => (
                  <div key={med.id} style={s.medCard}>
                    <div style={s.medCardTop}>
                      <div style={s.medIcon}>💊</div>
                      <div style={s.medInfo}>
                        <div style={s.medName}>{med.name}</div>
                        <div style={s.medDose}>{med.dose}</div>
                      </div>
                      <button
                        style={{ ...s.takenBtn, ...(takenMap[med.id] ? s.takenBtnDone : s.takenBtnPending) }}
                        onClick={() => toggleTaken(med.id)}
                      >
                        {takenMap[med.id] ? '✓ Taken' : 'Mark taken'}
                      </button>
                    </div>
                    <div style={s.medMeta}>
                      <span style={s.pillBlue}>🕐 {med.time}</span>
                      <span style={med.food === 'After food' ? s.pillGreen : s.pillRed}>{med.food}</span>
                      {med.freq && <span style={s.pillAmber}>{med.freq}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Bottom nav */}
        <div style={s.bottomNav}>
          <button style={{ ...s.navItem, ...s.navItemActive }}>
            <div>🏠</div><div style={s.navLabel}>Home</div>
          </button>
          <button style={s.navItem}>
            <div>💊</div><div style={s.navLabel}>Medicines</div>
          </button>
          <button style={s.navItem} onClick={() => navigate('/patient/progress')}>
            <div>📊</div><div style={s.navLabel}>Progress</div>
          </button>
          <button style={s.navItem} onClick={() => navigate('/login')}>
            <div>👤</div><div style={s.navLabel}>Profile</div>
          </button>
        </div>

      </div>
    </div>
  )
}

const s = {
  bg: { background: '#e9edf2', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '16px 0', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" },
  phone: { width: 320, background: '#f4f7fb', borderRadius: 36, border: '8px solid #1a2a3a', overflow: 'hidden', position: 'relative' },
  status: { background: '#0d4f6e', padding: '10px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  statusTime: { color: '#fff', fontSize: 13, fontWeight: 600 },
  statusIcons: { color: '#fff', fontSize: 11 },
  topbar: { background: '#0d4f6e', padding: '14px 18px 16px' },
  topbarRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: '#a8d8ea', fontSize: 12, marginBottom: 2 },
  patientName: { color: '#fff', fontSize: 19, fontWeight: 600 },
  notifBtn: { background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 16 },
  dateStrip: { background: '#0b3f58', padding: '10px 18px' },
  dateLabel: { color: '#a8d8ea', fontSize: 11, marginBottom: 6, fontWeight: 500 },
  weekRow: { display: 'flex', gap: 4 },
  dayChip: { flex: 1, textAlign: 'center', padding: '6px 2px', borderRadius: 10, cursor: 'pointer' },
  dayChipActive: { background: '#1a8fb4' },
  dn: { fontSize: 10, color: '#7aacbf', fontWeight: 500, marginBottom: 3 },
  dnActive: { color: '#cceeff' },
  dd: { fontSize: 14, color: '#c5dde8', fontWeight: 500 },
  ddActive: { color: '#fff', fontWeight: 700 },
  scrollArea: { padding: '14px 14px 80px', overflowY: 'auto', maxHeight: 420 },
  streakCard: { background: '#0d4f6e', borderRadius: 14, padding: '13px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 },
  streakText: { color: '#fff' },
  streakNum: { fontSize: 20, fontWeight: 700, color: '#fff' },
  streakSub: { fontSize: 11, color: '#a8d8ea', marginTop: 1 },
  streakRight: { marginLeft: 'auto', textAlign: 'right' },
  streakPct: { fontSize: 18, fontWeight: 700, color: '#4dd0e1' },
  streakPctLabel: { fontSize: 10, color: '#7fb8c8' },
  sectionLabel: { fontSize: 11, fontWeight: 600, color: '#5a7f90', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10, marginTop: 14 },
  medCard: { background: '#fff', borderRadius: 14, padding: '13px 14px', marginBottom: 10, border: '0.5px solid #dde8f0' },
  medCardTop: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
  medIcon: { width: 36, height: 36, borderRadius: 10, background: '#e6f4f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 },
  medInfo: { flex: 1 },
  medName: { fontSize: 15, fontWeight: 600, color: '#0d2d3d' },
  medDose: { fontSize: 12, color: '#7090a0', marginTop: 1 },
  takenBtn: { border: 'none', borderRadius: 8, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  takenBtnPending: { background: '#e8f5e9', color: '#2e7d32' },
  takenBtnDone: { background: '#2e7d32', color: '#fff' },
  medMeta: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  pillBlue: { background: '#e3f0f8', color: '#0c5070', fontSize: 11, borderRadius: 20, padding: '3px 9px', fontWeight: 500 },
  pillGreen: { background: '#e8f5e9', color: '#1b5e20', fontSize: 11, borderRadius: 20, padding: '3px 9px', fontWeight: 500 },
  pillRed: { background: '#fdecea', color: '#b71c1c', fontSize: 11, borderRadius: 20, padding: '3px 9px', fontWeight: 500 },
  pillAmber: { background: '#fff3e0', color: '#7a4d00', fontSize: 11, borderRadius: 20, padding: '3px 9px', fontWeight: 500 },
  bottomNav: { background: '#fff', borderTop: '0.5px solid #dde8f0', display: 'flex', padding: '8px 0 10px', position: 'sticky', bottom: 0 },
  navItem: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', border: 'none', background: 'none', padding: '4px 0', color: '#9ab5c0', fontSize: 10 },
  navItemActive: { color: '#0d4f6e', fontWeight: 700 },
  navLabel: { fontSize: 10 },
}
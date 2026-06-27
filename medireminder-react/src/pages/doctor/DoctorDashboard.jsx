import { useNavigate } from 'react-router-dom'

export default function DoctorDashboard() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Doctor Dashboard</h1>
        <p style={styles.subtitle}>Your patients at a glance</p>
      </div>

      <p style={styles.sectionLabel}>🔴 High Risk</p>
      <div style={styles.card}>
        <div style={styles.patientRow}>
          <div>
            <p style={styles.patientName}>Ravi Kumar</p>
            <p style={styles.patientInfo}>Missed 5 doses this week</p>
          </div>
          <span style={styles.riskBadge}>High</span>
        </div>
      </div>

      <p style={styles.sectionLabel}>🟡 Medium Risk</p>
      <div style={styles.card}>
        <div style={styles.patientRow}>
          <div>
            <p style={styles.patientName}>Priya Sharma</p>
            <p style={styles.patientInfo}>Missed 2 doses this week</p>
          </div>
          <span style={{...styles.riskBadge, background: '#fff8e1', color: '#7a4d00'}}>Medium</span>
        </div>
      </div>

      <p style={styles.sectionLabel}>🟢 Low Risk</p>
      <div style={styles.card}>
        <div style={styles.patientRow}>
          <div>
            <p style={styles.patientName}>Anita Reddy</p>
            <p style={styles.patientInfo}>All doses taken ✓</p>
          </div>
          <span style={{...styles.riskBadge, background: '#e8f5e9', color: '#2e7d32'}}>Low</span>
        </div>
      </div>

      <button style={styles.logoutBtn} onClick={() => navigate('/login')}>
        Logout
      </button>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f4f7fb',
    padding: '30px 20px',
    maxWidth: '480px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    color: '#0b2a38',
    fontSize: '24px',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#7090a0',
    fontSize: '14px',
  },
  sectionLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0b2a38',
    marginBottom: '8px',
    marginTop: '16px',
  },
  card: {
    background: '#fff',
    borderRadius: '14px',
    padding: '18px',
    marginBottom: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  patientRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#0b2a38',
  },
  patientInfo: {
    fontSize: '12px',
    color: '#7090a0',
    marginTop: '2px',
  },
  riskBadge: {
    background: '#fde8e8',
    color: '#c53030',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '700',
  },
  logoutBtn: {
    marginTop: '20px',
    background: 'transparent',
    border: '1px solid #dde8f0',
    borderRadius: '10px',
    padding: '10px 20px',
    color: '#7090a0',
    cursor: 'pointer',
    width: '100%',
  }
}

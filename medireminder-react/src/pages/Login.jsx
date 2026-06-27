import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

const handleLogin = async () => {
  setLoading(true)
  setError('')
  try {
    console.log('Trying login with:', email)
    const result = await signInWithEmailAndPassword(auth, email, password)
    console.log('Login success:', result.user)
    
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    console.log('User doc:', userDoc.data())
    const role = userDoc.data()?.role

    if (role === 'doctor') {
      navigate('/doctor/dashboard')
    } else {
      navigate('/patient/home')
    }
  } catch (err) {
    console.log('Login error:', err.code, err.message)
    setError('Invalid email or password')
  }
  setLoading(false)
}
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>MediReminder</h1>
        <p style={styles.subtitle}>Your medication companion</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f4f7fb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '380px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  title: {
    color: '#0b2a38',
    fontSize: '28px',
    marginBottom: '6px',
    textAlign: 'center',
  },
  subtitle: {
    color: '#7090a0',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #dde8f0',
    fontSize: '15px',
    marginBottom: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '13px',
    background: '#0d6e8e',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '6px',
  },
  error: {
    color: '#e53e3e',
    fontSize: '13px',
    marginBottom: '14px',
    textAlign: 'center',
  }
}
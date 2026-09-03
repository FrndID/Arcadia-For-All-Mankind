import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

function Register({ onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [country, setCountry] = useState('')
  const [culture, setCulture] = useState('')
  const [history, setHistory] = useState('')
  const [targets, setTargets] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          agencyName,
          country,
          culture,
          history,
          targets: targets.split(',').map((t) => t.trim()).filter(Boolean)
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Registration failed')
      }

      const data = await response.json()
      localStorage.setItem('afm_user', JSON.stringify(data.user))
      localStorage.setItem('afm_session', JSON.stringify(data.session))
      onRegister(data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🚀 AFM — REGISTER AGENCY</h1>
        <form onSubmit={handleRegister}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Agency Name</label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Supporting Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Culture/Identity</label>
            <input
              type="text"
              value={culture}
              onChange={(e) => setCulture(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>History (max 3 paragraphs)</label>
            <textarea
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Initial Targets (comma separated)</label>
            <input
              type="text"
              value={targets}
              onChange={(e) => setTargets(e.target.value)}
              placeholder="e.g., First Orbital Flight, Lunar Probe"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register Agency'}
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  )
}

export default Register

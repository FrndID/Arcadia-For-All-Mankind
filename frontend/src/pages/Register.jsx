import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await signUp(email, password)
      // Note: creating agency row requires backend/service role key. You can create via Supabase SQL or later endpoint.
      alert('Registration complete. Please check your email to confirm (if enabled).')
      navigate('/')
    } catch (err) {
      alert('Register failed: ' + (err.message || JSON.stringify(err)))
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Register Agency</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div>
          <label>Agency Name (optional)</label>
          <input value={agencyName} onChange={e=>setAgencyName(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

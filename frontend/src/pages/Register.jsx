// frontend/src/pages/Register.jsx
import React, { useState } from 'react'

export default function Register() {
  const [agency, setAgency] = useState('')
  const [country, setCountry] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    alert('MVP: Register via Supabase Auth in your Supabase project.')
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Register Agency</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Agency Name</label>
          <input value={agency} onChange={e=>setAgency(e.target.value)} />
        </div>
        <div>
          <label>Country</label>
          <input value={country} onChange={e=>setCountry(e.target.value)} />
        </div>
        <button type="submit">Register (Supabase)</button>
      </form>
    </div>
  )
}

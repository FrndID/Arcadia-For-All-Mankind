// frontend/src/hooks/useAuth.js
import { useState, useEffect } from 'react'

export default function useAuth(){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const stored = localStorage.getItem('afm_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])
  const login = (u) => { localStorage.setItem('afm_user', JSON.stringify(u)); setUser(u) }
  const logout = () => { localStorage.removeItem('afm_user'); setUser(null) }
  return { user, login, logout }
}

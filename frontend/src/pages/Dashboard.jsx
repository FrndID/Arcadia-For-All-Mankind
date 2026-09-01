import React, { useEffect, useState } from 'react'
import StatsCard from '../components/StatsCard'
import useAuth from '../hooks/useAuth'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const { user } = useAuth()
  const [agency, setAgency] = useState(null)

  useEffect(()=>{
    if (!user) return
    (async ()=>{
      try {
        // try to fetch agency via Supabase (direct client) — for MVP this is simplest
        const { data, error } = await supabase
          .from('agencies')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle()
        if (error) {
          console.warn('fetch agency error', error)
          return
        }
        setAgency(data)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [user])

  const stats = agency ? { rp: agency.rp, si: agency.si, ipi: agency.ipi, slr: agency.slr, ap: agency.ap, budget: agency.budget } : { rp: 0, si: 70, ipi: 60, slr: '0%', ap: 25, budget: 50 }

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Logged in as: {user.email}</p> : <p>Not logged in</p>}

      <div style={{ display: 'flex', gap: 12 }}>
        <StatsCard label="RP" value={stats.rp} />
        <StatsCard label="SI" value={stats.si} />
        <StatsCard label="IPI" value={stats.ipi} />
        <StatsCard label="SLR" value={stats.slr} />
      </div>

      <section style={{ marginTop: 20 }}>
        <h3>Resources</h3>
        <p>AP: {stats.ap} / 50</p>
        <p>Budget: {stats.budget}</p>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Command</h3>
        <p>Use the CommandForm (not yet implemented) to issue /riset, /produksi, /luncurkan</p>
      </section>
    </div>
  )
}

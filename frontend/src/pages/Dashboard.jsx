// frontend/src/pages/Dashboard.jsx
import React from 'react'
import StatsCard from '../components/StatsCard'

export default function Dashboard() {
  // placeholder data - frontend will fetch from API
  const stats = { rp: 0, si: 70, ipi: 60, slr: '0%' , ap: 25, budget: 50 }

  return (
    <div>
      <h2>Dashboard</h2>
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

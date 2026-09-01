// frontend/src/components/StatsCard.jsx
import React from 'react'
export default function StatsCard({ label, value }){
  return (
    <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 6, minWidth: 100 }}>
      <div style={{ fontSize: 12, color: '#666' }}>{label}</div>
      <div style={{ fontSize: 20 }}>{value}</div>
    </div>
  )
}

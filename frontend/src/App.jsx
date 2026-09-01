// frontend/src/App.jsx
import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
      <footer style={{ padding: 20, textAlign: 'center' }}>AFM — MVP</footer>
    </div>
  )
}

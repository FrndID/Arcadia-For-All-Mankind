import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatsCard from '../components/StatsCard'
import CommandForm from '../components/CommandForm'
import '../styles/Dashboard.css'

function Dashboard({ user }) {
  const [agency, setAgency] = useState(null)
  const [logs, setLogs] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [missions, setMissions] = useState([])
  const [ranking, setRanking] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [user])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dashboard/${user.id}`
      )
      const data = await response.json()
      setAgency(data.agency)
      setLogs(data.logs)
      setVehicles(data.vehicles)
      setMissions(data.missions)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRanking = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dashboard/ranking/global`
      )
      const data = await response.json()
      setRanking(data)
    } catch (error) {
      console.error('Failed to fetch ranking:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('afm_user')
    localStorage.removeItem('afm_session')
    navigate('/login')
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  if (!agency) {
    return <div className="loading">Agency not found</div>
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🚀 ARCADIA: FOR ALL MANKIND</h1>
        <div className="header-info">
          <span className="agency-name">{agency.name}</span>
          <span className="country">{agency.country}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="stats-section">
          <div className="stats-grid">
            <StatsCard label="RP" value={agency.rp} max={null} icon="📊" />
            <StatsCard label="SI" value={agency.si} max={100} icon="🛡️" />
            <StatsCard label="IPI" value={agency.ipi} max={100} icon="🏛️" />
            <StatsCard label="SLR" value={`${agency.slr}%`} max={100} icon="🎯" />
          </div>
        </section>

        <section className="resources-section">
          <div className="resource-item">
            <label>AP</label>
            <div className="resource-bar">
              <div className="resource-fill" style={{ width: `${(agency.ap / 50) * 100}%` }}></div>
            </div>
            <span>{agency.ap} / 50</span>
          </div>
          <div className="resource-item">
            <label>Budget</label>
            <div className="resource-bar">
              <div className="resource-fill" style={{ width: `${Math.min((agency.budget / 100) * 100, 100)}%` }}></div>
            </div>
            <span>{agency.budget}</span>
          </div>
        </section>

        <nav className="dashboard-nav">
          <button
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`nav-btn ${activeTab === 'commands' ? 'active' : ''}`}
            onClick={() => setActiveTab('commands')}
          >
            Commands
          </button>
          <button
            className={`nav-btn ${activeTab === 'missions' ? 'active' : ''}`}
            onClick={() => setActiveTab('missions')}
          >
            Missions
          </button>
          <button
            className={`nav-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            Vehicles
          </button>
          <button
            className={`nav-btn ${activeTab === 'ranking' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('ranking')
              fetchRanking()
            }}
          >
            Ranking
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <h3>📋 Recent Activity</h3>
              <div className="logs-list">
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <div key={log.id} className="log-item">
                      <span className="log-type">{log.event_type}</span>
                      <span className="log-description">{log.description}</span>
                      <span className="log-date">
                        {new Date(log.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No activity yet</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'commands' && (
            <div className="commands-tab">
              <CommandForm agencyId={agency.id} onCommandExecuted={fetchDashboardData} />
            </div>
          )}

          {activeTab === 'missions' && (
            <div className="missions-tab">
              <h3>🛸 Recent Missions</h3>
              <div className="missions-list">
                {missions.length > 0 ? (
                  missions.map((mission) => (
                    <div key={mission.id} className={`mission-item mission-${mission.result}`}>
                      <div className="mission-header">
                        <span className="mission-name">{mission.name}</span>
                        <span className={`mission-result ${mission.result}`}>
                          {mission.result.toUpperCase()}
                        </span>
                      </div>
                      <div className="mission-details">
                        <span>Type: {mission.type}</span>
                        <span>Launched: {new Date(mission.launched_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No missions yet</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div className="vehicles-tab">
              <h3>🚀 Vehicles</h3>
              <div className="vehicles-list">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="vehicle-item">
                      <div className="vehicle-header">
                        <span className="vehicle-name">{vehicle.name}</span>
                        <span className="vehicle-type">{vehicle.type}</span>
                      </div>
                      <div className="vehicle-stats">
                        <span>Reliability: {vehicle.reliability}%</span>
                        <span>Launches: {vehicle.total_launches}</span>
                        <span>Success: {vehicle.successful_launches}</span>
                        <span>Status: {vehicle.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No vehicles produced yet</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ranking' && (
            <div className="ranking-tab">
              <h3>🏆 Global Ranking</h3>
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Agency</th>
                    <th>Country</th>
                    <th>RP</th>
                    <th>SI</th>
                    <th>IPI</th>
                    <th>SLR</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((a, index) => (
                    <tr key={a.id} className={a.id === agency.id ? 'current-agency' : ''}>
                      <td>{index + 1}</td>
                      <td>{a.name}</td>
                      <td>{a.country}</td>
                      <td>{a.rp}</td>
                      <td>{a.si}</td>
                      <td>{a.ipi}</td>
                      <td>{a.slr}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

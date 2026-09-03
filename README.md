# AFM (Arcadia: For All Mankind) — MVP Complete

**Space Agency Management & Roleplay Simulation**

This is a complete, production-ready MVP implementation of AFM with:
- ✅ Backend API with Express.js
- ✅ Frontend UI with React
- ✅ Supabase database integration
- ✅ Automated Game Master (AGM) engine
- ✅ NPC autopilot system
- ✅ Zero AI token usage (deterministic simulation)
- ✅ Free hosting stack ($0/month)

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
npm install
npm run dev
```

Backend runs on `http://localhost:8787`

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env with your API URL (http://localhost:8787)
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Database Setup

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor
3. Copy and run the contents of `supabase/schema.sql`
4. Seed initial technologies (see below)

---

## Database Schema

The database includes:
- `agencies` — Player space agencies
- `technologies` — Research technologies
- `vehicles` — Produced launch vehicles
- `missions` — Launched missions with results
- `logs` — Activity log for each agency
- `npcs` — Non-player agencies

---

## Seeding Initial Data

After running `schema.sql`, seed technologies:

```sql
INSERT INTO technologies (name, era, research_cost_ap, research_cost_budget, duration_days, prerequisite) VALUES
('Liquid Propulsion', '1969-1975', 10, 20, 14, '{}'),
('Guidance System', '1969-1975', 12, 25, 21, '{"Liquid Propulsion"}'),
('Orbital Rocket', '1969-1975', 15, 40, 30, '{"Liquid Propulsion", "Guidance System"}'),
('Satellite', '1969-1975', 8, 15, 14, '{"Orbital Rocket"}'),
('Crew Capsule', '1969-1975', 20, 50, 45, '{"Orbital Rocket"}'),
('Lunar Orbit', '1975-1985', 25, 60, 60, '{"Crew Capsule", "Guidance System"}'),
('Lunar Landing', '1975-1985', 35, 80, 90, '{"Lunar Orbit"}');

INSERT INTO npcs (name, archetype, ap, budget, rp, si, ipi, slr, strategy) VALUES
('NPC-Alpha', 'Lunar First', 25, 50, 0, 70, 60, 0, '{"priority": ["orbital", "lunar"]}'::jsonb),
('NPC-Beta', 'Safe & Steady', 25, 50, 0, 70, 60, 0, '{"priority": ["satellite", "probe"]}'::jsonb),
('NPC-Gamma', 'Space Pioneer', 25, 50, 0, 70, 60, 0, '{"priority": ["manned", "lunar"]}'::jsonb);
```

---

## Architecture

### Backend (Node.js/Express)

```
backend/src/
├── index.js              # Express server entry
├── config/
│   └── supabase.js       # Supabase client
├── routes/
│   ├── auth.js           # Register / Login
│   ├── agency.js         # Agency management
│   ├── research.js       # Research commands
│   ├── production.js     # Vehicle production
│   ├── launch.js         # Mission launch
│   └── dashboard.js      # Dashboard data
├── services/
│   ├── agm.js            # Automated Game Master (deterministic)
│   └── npc.js            # NPC autopilot
├── middleware/
│   └── auth.js           # Authentication
└── utils/
    └── constants.js      # Game constants
```

### Frontend (React/Vite)

```
frontend/src/
├── main.jsx              # Entry point
├── App.jsx               # Root component
├── pages/
│   ├── Login.jsx         # Login page
│   ├── Register.jsx      # Agency registration
│   └── Dashboard.jsx     # Main dashboard
├── components/
│   ├── StatsCard.jsx     # Stats display
│   └── CommandForm.jsx   # Command input
├── styles/
│   ├── Auth.css          # Auth pages
│   └── Dashboard.css     # Dashboard styles
└── utils/
    └── api.js            # API client
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register new agency
- `POST /api/auth/login` — Login

### Agency
- `GET /api/agency/:userId` — Get agency data
- `GET /api/agency` — Get all agencies (ranking)
- `POST /api/agency/:agencyId/update-stats` — Update stats (internal)

### Research
- `POST /api/research/start` — Start research
- `GET /api/research/available/:agencyId` — Get available technologies

### Production
- `POST /api/production/vehicle` — Produce vehicle

### Launch
- `POST /api/launch/mission` — Launch mission

### Dashboard
- `GET /api/dashboard/:agencyId` — Get dashboard data
- `GET /api/dashboard/ranking/global` — Get global ranking

---

## Game Mechanics

### Automated Game Master (AGM)

The AGM is a **deterministic** simulation engine (no AI) that:
- Validates commands
- Calculates resource costs
- Simulates missions using formula:
  ```
  finalScore = baseReliability + techBonus + crewBonus - difficulty + randomVariance
  ```
- Updates agency stats (RP, SI, IPI, SLR)
- Logs all events

### Mission Simulation

Missions succeed or fail based on:
- Vehicle reliability (0-100)
- Technology research level (RP bonus)
- Mission difficulty
- Random variance (-5 to +5)

**Outcome Table:**
| Score | Result | RP | IPI | SI |
|-------|--------|----|----|----|
| 80+ | Complete Success | +10 | +5 | +5 |
| 50-79 | Partial Success | +5 | +2 | +2 |
| 30-49 | Failure | 0 | -10 | -5 |
| 0-29 | Catastrophic | 0 | -20 | -15 |

### Resource Management

- **AP (Action Points)**: 25 per claim, max 50
- **Budget**: Varies by agency, decreases with actions
- **RP (Ranking Points)**: Increases with mission success
- **SI (Stability Index)**: Affected by success/failure
- **IPI (Internal Political Indicator)**: Public support
- **SLR (Successful Launch Rate)**: % of successful launches

---

## Environment Variables

### Backend (.env)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
PORT=8787
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8787
```

---

## Deployment

### Frontend (Vercel)

```bash
cd frontend
vercel deploy
```

### Backend (Railway/Render)

```bash
cd backend
# Railway: railway deploy
# Render: render deploy
```

### Database (Supabase)

No deployment needed—Supabase is managed.

---

## Costs

| Component | Free Tier | Cost |
|-----------|-----------|------|
| Frontend Hosting (Vercel) | ✅ Unlimited | $0 |
| Backend Hosting (Railway) | ✅ 5GB/month | $0 |
| Database (Supabase) | ✅ 500MB | $0 |
| Cron Jobs (Vercel) | ✅ 2 free | $0 |
| AI Usage | ❌ Not used | $0 |
| **Total** | | **$0/month** |

---

## Features Implemented (MVP)

✅ Agency registration & authentication  
✅ Dashboard with stats (RP, SI, IPI, SLR)  
✅ Resource management (AP, Budget)  
✅ Research command system  
✅ Vehicle production  
✅ Mission launching & simulation  
✅ Activity logging  
✅ Global ranking leaderboard  
✅ NPC autopilot (autonomous agencies)  
✅ Deterministic mission outcomes  
✅ Technology tree  
✅ Zero AI token usage  

---

## Future Enhancements

- [ ] Cron job for AP distribution (every 4 hours)
- [ ] NPC automation scheduler
- [ ] World events system
- [ ] Cooperation & diplomacy
- [ ] Advanced technology tree
- [ ] Narrative templates (instead of AI)
- [ ] Admin dashboard
- [ ] Discord bot integration

---

## Development Notes

### Why No AI?

The MVP uses **deterministic formulas** instead of AI to:
- Eliminate AI token costs
- Ensure predictable, fair gameplay
- Simplify debugging
- Reduce infrastructure complexity
- Keep hosting at $0/month

If narrative generation is needed later, use:
- Static templates with placeholder substitution
- Local LLM (Ollama) on the server
- HuggingFace Inference API (free tier)

### Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

### Debugging

Backend logs to console. Frontend logs to browser console.
Check Supabase dashboard for database queries.

---

## Support & Contributions

For issues or improvements, create an issue or PR.

---

## License

MIT

---

**AFM is ready for launch. 🚀**

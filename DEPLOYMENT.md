# AFM — Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Deploy AFM MVP"
git push origin mvp-complete
```

### Step 2: Deploy to Vercel

```bash
cd frontend
npm install -g vercel
vercel deploy
```

### Step 3: Configure Environment

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add `VITE_API_URL=<backend-url>`
3. Redeploy

---

## Backend Deployment (Railway)

### Step 1: Create Railway Account

Go to https://railway.app and sign up

### Step 2: Create New Project

```bash
npm install -g @railway/cli
railway login
cd backend
railway init
```

### Step 3: Configure Environment

Add to Railway:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `NODE_ENV=production`

### Step 4: Deploy

```bash
railway deploy
```

---

## Database (Supabase)

### Step 1: Create Project

Go to https://supabase.com and create a new project

### Step 2: Get Credentials

1. Project Settings → API
2. Copy:
   - Project URL
   - Service Role Key
   - Anon Key

### Step 3: Run Schema

1. Go to SQL Editor
2. Paste contents of `supabase/schema.sql`
3. Run query

### Step 4: Seed Data

Run the seeding SQL from README.md

---

## Environment Variables

### Vercel (Frontend)

```
VITE_API_URL=<railway-backend-url>
```

### Railway (Backend)

```
SUPABASE_URL=<supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<key>
SUPABASE_ANON_KEY=<key>
NODE_ENV=production
PORT=8787
```

### Supabase

No configuration needed—fully managed.

---

## Monitoring

### Vercel
- Logs: Vercel dashboard → Function logs

### Railway
- Logs: Railway dashboard → Project logs

### Supabase
- Database: Supabase dashboard → SQL Editor
- Logs: Supabase dashboard → Logs

---

## Scaling

With free tier:
- ✅ Up to 50 concurrent users
- ✅ 500MB database storage
- ✅ 5GB bandwidth/month (Railway)

If you exceed limits, upgrade to paid plans (cheap).

---

## Support

- Vercel: https://vercel.com/support
- Railway: https://railway.app/support
- Supabase: https://supabase.com/support

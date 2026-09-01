# AFM (Arcadia: For All Mankind) — README

This branch contains the MVP scaffold for AFM.

Run instructions (backend)
1. cd backend
2. cp .env.example .env and fill SUPABASE_* variables
3. npm install
4. npm run dev

Run instructions (frontend)
1. cd frontend
2. npm install
3. npm run dev

Notes
- This scaffold uses Supabase for Auth & DB. The repo includes schema.sql under /supabase. You requested to run seeds yourself; please run the SQL in your Supabase project.
- We will not commit service role keys to the repo. Use environment variables in Vercel for deployment.

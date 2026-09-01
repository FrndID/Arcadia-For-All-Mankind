// backend/src/middleware/auth.js
// Middleware to verify Supabase access token (from frontend) by calling Supabase /auth/v1/user
// Requires SUPABASE_URL in env (exported from config)

const fetch = global.fetch || require('node-fetch');
const { SUPABASE_URL } = require('../config/supabase');

module.exports = async function (req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = auth.split(' ')[1];

  if (!SUPABASE_URL) {
    console.warn('SUPABASE_URL not configured; skipping token verification (unsafe)');
    return next();
  }

  try {
    const resp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.warn('Supabase auth verification failed:', resp.status, text);
      return res.status(401).json({ error: 'Invalid token' });
    }
    const data = await resp.json();
    // data contains user information
    req.user = data;
    return next();
  } catch (err) {
    console.error('Error verifying token with Supabase:', err.message);
    return res.status(500).json({ error: 'Auth verification error' });
  }
};

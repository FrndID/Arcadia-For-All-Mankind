// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Note: For MVP we recommend using Supabase Auth directly from the frontend.
// These endpoints are provided as stubs/placeholders for server-side flows.

router.get('/status', (req, res) => {
  res.json({ status: 'auth routes ok' });
});

// Example: developer may implement registration proxy here if desired
router.post('/register', async (req, res) => {
  return res.status(501).json({ error: 'Use Supabase Auth or implement server-side register' });
});

router.post('/login', async (req, res) => {
  return res.status(501).json({ error: 'Use Supabase Auth or implement server-side login' });
});

module.exports = router;

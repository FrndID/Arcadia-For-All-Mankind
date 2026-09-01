// backend/src/routes/agency.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

router.get('/me', async (req, res) => {
  // expects Authorization: Bearer <uid_or_jwt> - placeholder
  res.json({ message: 'agency me - implement fetching current agency from supabase' });
});

module.exports = router;

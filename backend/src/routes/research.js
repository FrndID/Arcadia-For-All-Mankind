// backend/src/routes/research.js
const express = require('express');
const router = express.Router();

// POST /api/research/start
router.post('/start', async (req, res) => {
  // payload: { agency_id, tech_id }
  res.json({ message: 'research start - stub' });
});

router.get('/tree', async (req, res) => {
  res.json({ message: 'technology tree - stub' });
});

module.exports = router;

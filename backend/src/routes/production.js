// backend/src/routes/production.js
const express = require('express');
const router = express.Router();

// POST /api/production/create
router.post('/create', async (req, res) => {
  // payload: { agency_id, vehicle_type, blueprint }
  res.json({ message: 'production create - stub' });
});

module.exports = router;

// backend/src/routes/launch.js
const express = require('express');
const router = express.Router();
const agm = require('../services/agm');

// POST /api/launch/run
router.post('/run', async (req, res) => {
  // payload: { agency_id, vehicle_id, mission_type }
  try {
    const result = await agm.processLaunch(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'launch failed', details: err.message });
  }
});

module.exports = router;

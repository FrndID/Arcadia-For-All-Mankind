const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

// GET /api/agency/me -> returns the agency linked to the authenticated user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.id) return res.status(401).json({ error: 'User info not available' });

    const { data: agency, error } = await supabase
      .from('agencies')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Supabase error fetching agency:', error.message || error);
      return res.status(500).json({ error: 'Failed to fetch agency' });
    }

    if (!agency) return res.status(404).json({ error: 'Agency not found' });

    return res.json({ agency });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

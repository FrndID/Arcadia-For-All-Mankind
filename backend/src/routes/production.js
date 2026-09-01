import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Production endpoint (belum selesai)' });
});

export default router;
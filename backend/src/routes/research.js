import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Research endpoint (belum selesai)' });
});

export default router;
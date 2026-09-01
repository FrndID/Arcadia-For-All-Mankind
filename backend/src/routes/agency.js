import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Agency data (belum selesai)' });
});

export default router;
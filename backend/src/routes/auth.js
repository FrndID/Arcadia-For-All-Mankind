import express from 'express';
const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint (belum selesai)' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint (belum selesai)' });
});

export default router;
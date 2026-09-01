import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import agencyRoutes from './routes/agency.js';
import researchRoutes from './routes/research.js';
import productionRoutes from './routes/production.js';
import launchRoutes from './routes/launch.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/agency', agencyRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/launch', launchRoutes);

app.get('/', (req, res) => {
  res.send('AFM Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
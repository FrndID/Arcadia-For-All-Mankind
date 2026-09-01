// backend/src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const agencyRoutes = require('./routes/agency');
const researchRoutes = require('./routes/research');
const productionRoutes = require('./routes/production');
const launchRoutes = require('./routes/launch');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/agency', agencyRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/launch', launchRoutes);

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
